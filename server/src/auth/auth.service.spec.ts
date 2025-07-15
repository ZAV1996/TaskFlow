import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { SmtpSendlerService } from '../smtp-sendler/smtp-sendler.service';
import { CryptoService } from '../crypto-module/crypto.service';
import { SessionService, TSession } from '../session/session.service';
import { SessionResolver } from '../session/session.resolver';
import { ConflictException, ForbiddenException, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { Duration } from 'luxon';
import { v4 as uuid } from 'uuid'
import { ConfirmInput } from './dto/confirm.input';
import * as deviceUtils from 'src/common/utils/get-divice-id';
import * as ipUtils from 'src/common/utils/get-client-ip';
import { Request, Response } from 'express';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcryptjs'
import { SetNewPassForgot } from './dto/set-new-pass.input';

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mocked-uuid') // Фиксированное значение для тестов
}));
jest.mock('luxon', () => {
    const originalLuxon = jest.requireActual('luxon');
    return {
        ...originalLuxon,
        Duration: {
            fromObject: jest.fn(() => ({
                shiftTo: jest.fn().mockReturnThis(),
                toHuman: jest.fn().mockReturnValue("23 часа 45 минут")
            }))
        }
    };
})
describe('AuthService', () => {
    let authService: AuthService;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    // Моки всех зависимостей
    const mockUsersService = {
        getUserByEmail: jest.fn(),
        userRepository: {
            save: jest.fn(),
        },
        updatePass: jest.fn(),
    };

    const mockRedisService = {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
        getTtl: jest.fn(),
    };

    const mockSmtpService = {
        sendUserConfirmation: jest.fn(),
        sendForgotPasswordMail: jest.fn(),
    };

    const mockCryptoService = {
        hashData: jest.fn(),
    };

    const mockSessionService = {
        create_session: jest.fn(),
    };

    const mockSessionResolver = {
        kill_session: jest.fn().mockResolvedValue(true),
    };

    const mockUserRepo = {
        create: jest.fn(),
    };

    beforeEach(async () => {
        jest.spyOn(deviceUtils, 'getDeviceID').mockReturnValue('mocked-device-id');
        jest.spyOn(ipUtils, 'getClientIp').mockReturnValue('mocked-ip');

        // Моки для Request и Response
        mockRequest = {
            cookies: {},
            headers: { 'user-agent': 'test-agent' },
        };
        mockResponse = {
            cookie: jest.fn(),
            clearCookie: jest.fn(),
            req: { ...mockRequest } as Request,
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: mockUsersService },
                { provide: RedisService, useValue: mockRedisService },
                { provide: SmtpSendlerService, useValue: mockSmtpService },
                { provide: CryptoService, useValue: mockCryptoService },
                { provide: SessionService, useValue: mockSessionService },
                { provide: SessionResolver, useValue: mockSessionResolver },
                { provide: getRepositoryToken(User), useValue: mockUserRepo },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('confirm', () => {
        it('должен подтверждать учетную запись при правильном токене', async () => {
            const tempUser = { user: { email: 'test@test.com' }, uuid: 'correct-token' };
            const savedUser = { ...tempUser.user, ID: 1 }; // Подготовка данных

            // 1. Мокирование ДО вызова
            mockRedisService.get.mockResolvedValue(tempUser);
            mockUsersService.userRepository.save.mockResolvedValue(savedUser); // Важно: сначала мокируем!

            // 2. Вызов метода
            const result = await authService.confirm({
                email: 'test@test.com',
                activationToken: 'correct-token',
            });

            // 3. Проверки
            expect(mockUsersService.userRepository.save).toHaveBeenCalledWith(tempUser.user);
            expect(mockRedisService.del).toHaveBeenCalledWith('register:email:test@test.com');
            expect(result).toBe("Учетная запись успешно подтверждена.");
        });

        it('должен выбрасывать исключение, если ссылка истекла', async () => {
            mockRedisService.get.mockResolvedValue(null);
            await expect(authService.confirm({ email: 'test@test.com', activationToken: 'correct-token' }))
                .rejects
                .toThrow("Срок действия ссылки для активации аккаунта истек");
        });

        it('должен выбрасывать ForbiddenException при неправильном токене', async () => {
            const tempUser = { user: { email: 'test@test.com' }, uuid: 'wrong-token' };
            mockRedisService.get.mockResolvedValue(tempUser);
            await expect(authService.confirm({ email: 'test@test.com', activationToken: 'incorrect-token' }))
                .rejects
                .toThrow(ForbiddenException);
        });

        it("Должен выбрасывать исключение если произошла ошибка при сохранении пользователя в базу данных при успешном подтверждении почты", async () => {
            const uuid = 'correct-token'
            const data: ConfirmInput = {
                email: "test@test.com",
                activationToken: uuid
            }
            const user = null;
            const temporary_user = { user: { email: "test@test.com", name: "Test", password: "Test", patronymic: "Test", surname: "Test" } as User, uuid: 'correct-token' };

            // 1. Мокирование
            mockRedisService.get.mockResolvedValue(temporary_user)
            mockUsersService.userRepository.save.mockResolvedValue(user)

            await expect(authService.confirm(data))
                .rejects
                .toThrow(new Error("Ошибка регистрации, повторите попытку"))

            // 3. Проверки
            expect(mockRedisService.get).toHaveBeenCalledWith(`register:email:${data.email}`)
            expect(mockUsersService.userRepository.save).toHaveBeenCalledWith(temporary_user.user)
        })
    });

    describe('register', () => {
        it('Должен отправлять ссылку на подтверждение адреса электронной почты при регистрации', async () => {
            const registerDTO: RegisterInput = { email: "test@test.com", name: "Test", password: "Test", patronymic: "Test", surname: "Test" }
            const uuid = 'mocked-uuid';
            const temporary_candidate = null;
            const temporary_candidate_ttl = 86400
            const candidate = null;
            const hashPass = "hash"
            const user = { ...registerDTO, isActivated: true, password: hashPass }
            // 1. Мокирование
            mockRedisService.getTtl.mockResolvedValue(temporary_candidate_ttl)
            mockRedisService.get.mockResolvedValue(temporary_candidate);
            mockUsersService.getUserByEmail.mockResolvedValue(candidate)
            mockCryptoService.hashData.mockResolvedValue(hashPass);
            mockUserRepo.create.mockReturnValue(user)

            // 2. Вызов метода
            const result = await authService.register(registerDTO)

            // 3. Проверки
            expect(mockRedisService.getTtl).toHaveBeenCalledWith(`register:email:${registerDTO.email}`)
            expect(mockRedisService.get).toHaveBeenCalledWith(`register:email:${registerDTO.email}`)
            expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(registerDTO.email);
            expect(mockCryptoService.hashData).toHaveBeenCalledWith(registerDTO.password);
            expect(mockUserRepo.create).toHaveBeenCalledWith({ ...registerDTO, isActivated: true, password: hashPass })
            expect(mockRedisService.set).toHaveBeenCalledWith(`register:email:${registerDTO.email}`, JSON.stringify({ user, uuid } as { user: User, uuid: string }), 86400);
            expect(mockSmtpService.sendUserConfirmation).toHaveBeenCalledWith(user, uuid)

            expect(result).toBe("Вам на почту придет письмо для активации учетной записи.");
        })
        it("Должен выбрасывать исключение, если пользователь уже зарегистрирован", async () => {
            const registerDTO: RegisterInput = { email: "test@test.com", name: "Test", password: "Test", patronymic: "Test", surname: "Test" }
            const candidate = { email: "test@test.com", name: "Test1", password: "Test1", patronymic: "Test1", surname: "Test1" };
            // 1. Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(candidate);
            // 2. Вызов метода
            await expect(authService.register(registerDTO))
                .rejects
                .toThrow(new HttpException(
                    "Пользователь с таким email уже зарегистрирован.",
                    HttpStatus.BAD_REQUEST
                ));
            // 3. Проверки
            expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(registerDTO.email)
        })
        it("Должен выбрасывать исключение, если пользователь зареристрировался, но еще не подтвердил учетную запись", async () => {
            const registerDTO: RegisterInput = { email: "test@test.com", name: "Test", password: "Test", patronymic: "Test", surname: "Test" }
            const temporary_candidate = { email: "test@test.com", name: "Test1", password: "Test1", patronymic: "Test1", surname: "Test1" };
            const temporary_candidate_ttl = 86400
            const totalMinutes = Math.round(temporary_candidate_ttl / 60);
            const duration = Duration.fromObject({ minutes: totalMinutes })
                .shiftTo('hours', 'minutes')
                .toHuman({ listStyle: 'long', unitDisplay: 'long' });;

            // 1. Мокирование
            mockRedisService.get.mockResolvedValue(temporary_candidate)

            // 2. Вызываем метод с исключением
            await expect(authService.register(registerDTO))
                .rejects
                .toThrow(new HttpException(`Пользователь с таким email уже регистрировался, однако учетную запись не подтвердил, оставшееся время для подтверждения учетной записи: ${duration}`, HttpStatus.BAD_REQUEST))

            // 3. Проверки
            expect(mockRedisService.get).toHaveBeenCalledWith(`register:email:${registerDTO.email}`);
        })
    })

    describe('login', () => {
        it('успешная авторизация', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'correct-password',
            };

            const user = { ID: 1, email: credentials.email, isActivated: true } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
            mockSessionService.create_session.mockResolvedValue(undefined);

            // Вызов
            const result = await authService.login(credentials, {
                req: mockRequest as Request,
                res: mockResponse as Response,
            });

            // Проверки
            expect(result).toEqual(user);
            expect(mockResponse.cookie).toHaveBeenCalledWith(
                'session_uuid',
                'mocked-uuid',
                expect.anything()
            );
            expect(mockSessionService.create_session).toHaveBeenCalled();
        });

        it('ошибка при попытке войти уже авторизованным', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'correct-password',
            };

            // Эмулируем существующую сессию
            mockRequest.cookies = { session_uuid: 'existing-session' };
            mockRedisService.get.mockResolvedValue({
                deviceId: 'mocked-device-id',
            } as TSession);

            await expect(
                authService.login(credentials, {
                    req: mockRequest as Request,
                    res: mockResponse as Response,
                })
            ).rejects.toThrow(ConflictException);
        });

        it('ошибка при неверном пароле', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'wrong-password',
            };

            const user = { ID: 1, email: credentials.email } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            await expect(
                authService.login(credentials, {
                    req: mockRequest as Request,
                    res: mockResponse as Response,
                })
            ).rejects.toThrow(UnauthorizedException);
        });

        it('ошибка при неактивированном аккаунте', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'correct-password',
            };

            const user = {
                ID: 1,
                email: credentials.email,
                isActivated: false // Аккаунт деактивирован
            } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

            await expect(
                authService.login(credentials, {
                    req: mockRequest as Request,
                    res: mockResponse as Response,
                })
            ).rejects.toThrow(UnauthorizedException);
        });
    });
    describe('logout', () => {
        it('успешный выход из системы', async () => {
            mockRequest.cookies = { session_uuid: 'existing-session' };

            const result = await authService.logout({
                ...mockResponse,
                req: mockRequest,
            } as unknown as Response);

            expect(result).toBe(true);
            expect(mockSessionResolver.kill_session).toHaveBeenCalledWith('existing-session');
        });
    });
    describe('forgot', () => {
        it('успешная отправка письма для восстановления', async () => {
            const email = 'test@test.com';
            const user = { ID: 1, email } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            mockRedisService.set.mockResolvedValue('OK');

            const result = await authService.forgot({ email });

            expect(result).toBe("Вам на почту придет с ссылкой на изменение пароля.");
            expect(mockSmtpService.sendForgotPasswordMail).toHaveBeenCalledWith(user, 'mocked-uuid');
        });

        it('ошибка при отсутствии пользователя', async () => {
            const email = 'nonexistent@test.com';

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(null);


            await expect(authService.forgot({ email }))
                .rejects
                .toThrow(new UnauthorizedException(UnauthorizedException))

            expect(mockUsersService.getUserByEmail).toHaveBeenCalledWith(email);
        });

        it('ошибка при сохранении токена в Redis', async () => {
            const email = 'test@test.com';
            const user = { ID: 1, email } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            mockRedisService.set.mockResolvedValue(null); // Ошибка сохранения

            const result = await authService.forgot({ email });

            expect(result).toBeUndefined();
            expect(mockSmtpService.sendForgotPasswordMail).not.toHaveBeenCalled();
        });
    });

    describe('updateForgotPass', () => {
        const dto: SetNewPassForgot = {
            email: 'test@test.com',
            token: 'correct-token',
            password: 'new-password',
            double_password: 'new-password'
        };

        it('успешное обновление пароля', async () => {
            const user = { ID: 1, email: dto.email } as User;
            const hashedPassword = 'hashed-new-password';

            // Мокирование
            mockRedisService.get.mockResolvedValue('correct-token');
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            mockCryptoService.hashData.mockResolvedValue(hashedPassword);
            mockUsersService.updatePass.mockResolvedValue(user);

            const result = await authService.updateForgotPass(dto);

            expect(result).toEqual(user);
            expect(mockRedisService.del).toHaveBeenCalledWith(`forgot:email:${dto.email}`);
            expect(mockUsersService.updatePass).toHaveBeenCalledWith(user, hashedPassword);
        });

        it('ошибка при истечении срока токена', async () => {
            // Мокирование
            mockRedisService.get.mockResolvedValue(null);

            await expect(authService.updateForgotPass(dto))
                .rejects
                .toThrow(ForbiddenException);
        });

        it('ошибка при неверном токене', async () => {
            // Мокирование
            mockRedisService.get.mockResolvedValue('wrong-token');

            await expect(authService.updateForgotPass(dto))
                .rejects
                .toThrow(ForbiddenException);
        });

        it('ошибка при отсутствии пользователя', async () => {
            // Мокирование
            mockRedisService.get.mockResolvedValue('correct-token');
            mockUsersService.getUserByEmail.mockResolvedValue(null);

            await expect(authService.updateForgotPass(dto))
                .rejects
                .toThrow(NotFoundException);
        });
    });
    describe('validate', () => {
        it('успешная проверка учетных данных', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'correct-password',
            };

            const user = {
                ID: 1,
                email: credentials.email,
                isActivated: true,
                password: 'hashed-password'
            } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

            const result = await authService['validate'](credentials);

            expect(result).toEqual(user);
        });

        it('ошибка при неверном пароле', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'wrong-password',
            };

            const user = {
                ID: 1,
                email: credentials.email,
                password: 'hashed-password'
            } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            await expect(authService['validate'](credentials))
                .rejects
                .toThrow(UnauthorizedException);
        });

        it('ошибка при неактивированном аккаунте', async () => {
            const credentials: LoginInput = {
                email: 'test@test.com',
                password: 'correct-password',
            };

            const user = {
                ID: 1,
                email: credentials.email,
                isActivated: false, // Аккаунт деактивирован
                password: 'hashed-password'
            } as User;

            // Мокирование
            mockUsersService.getUserByEmail.mockResolvedValue(user);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

            await expect(authService['validate'](credentials))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });
});