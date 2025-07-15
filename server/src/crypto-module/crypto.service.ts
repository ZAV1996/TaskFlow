import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class CryptoService {
    constructor(
    ) { }
    async hashData(data: string) {
        return await bcrypt.hash(data, 10)
    }
    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    
}
