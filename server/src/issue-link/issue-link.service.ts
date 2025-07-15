import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueLink, LinkType } from './entities/issue-link.entity';
import { Repository } from 'typeorm';
import { Issue } from 'src/issues/entities/issue.entity';
import { CreateIssueLinkInput } from './inputs/createIssueLink.input';
import { Status } from 'src/status/entities/status.entity';


@Injectable()
export class IssueLinkService {
  constructor(
    @InjectRepository(IssueLink) private issueLinkRepository: Repository<IssueLink>,
    @InjectRepository(Issue) private issueRepository: Repository<Issue>,
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) { }

  /**
   * Создает новую связь между задачами.
   * @param createIssueLinkDto Данные для создания связи.
   * @returns Созданная связь задач.
   */
  async createIssueLink(createIssueLinkDto: CreateIssueLinkInput): Promise<IssueLink> {
    const { sourceIssueId, targetIssueId, linkType } = createIssueLinkDto;

    // Выполняем валидацию статусов перед созданием связи
    await this.validateLinkStatuses(sourceIssueId, targetIssueId, linkType);

    // Проверяем существование исходной и целевой задач
    const sourceIssue = await this.issueRepository.findOne({ where: { ID: sourceIssueId } });
    const targetIssue = await this.issueRepository.findOne({ where: { ID: targetIssueId } });

    if (!sourceIssue) {
      throw new NotFoundException(`Исходная задача с ID ${sourceIssueId} не найдена.`);
    }
    if (!targetIssue) {
      throw new NotFoundException(`Целевая задача с ID ${targetIssueId} не найдена.`);
    }

    // Создаем новую сущность IssueLink
    const newIssueLink = this.issueLinkRepository.create({
      source_issue: sourceIssue, // Присваиваем сущности Issue
      target_issue: targetIssue, // Присваиваем сущности Issue
      link_type: linkType,
    });

    // Сохраняем в базе данных
    return this.issueLinkRepository.save(newIssueLink);
  }

  /**
   * Получает все связи задач.
   * @returns Массив всех связей задач.
   * @argument Нет аргументов
   * @todo Сделать нормальный линк
   */
  async getAllIssueLinks(): Promise<IssueLink[]> {
    // Eager loading source_issue и target_issue для получения полной информации о задачах
    return this.issueLinkRepository.find({ relations: ['source_issue', 'target_issue'] });
  }

  /**
   * Получает связь задачи по её ID.
   * @param id ID связи задачи.
   * @returns Связь задачи или undefined, если не найдена.
   */
  async getIssueLinkById(id: number): Promise<IssueLink | undefined> {
    // Eager loading source_issue и target_issue
    const issueLink = await this.issueLinkRepository.findOne({
      where: { ID: id },
      relations: ['source_issue', 'target_issue'],
    });

    if (!issueLink) {
      throw new NotFoundException(`Связь задачи с ID ${id} не найдена.`);
    }

    return issueLink;
  }

  /**
   * Обновляет существующую связь задачи.
   * @param id ID связи задачи для обновления.
   * @param updateIssueLinkDto Данные для обновления.
   * @returns Обновленная связь задачи.
   */
  async updateIssueLink(id: number, updateIssueLinkDto: CreateIssueLinkInput): Promise<IssueLink> {
    const issueLink = await this.getIssueLinkById(id); // Используем метод получения для проверки существования
    if (!issueLink) throw new NotFoundException('Связь между задачами ненайдена')

    const { sourceIssueId, targetIssueId, linkType } = updateIssueLinkDto;

    // Определяем ID задач и тип связи, которые будут использоваться для валидации
    // Используем новые значения из DTO, если они предоставлены, иначе текущие значения связи
    const validationSourceIssueId = sourceIssueId !== undefined ? sourceIssueId : issueLink.source_issue.ID;
    const validationTargetIssueId = targetIssueId !== undefined ? targetIssueId : issueLink.target_issue.ID;
    const validationLinkType = linkType !== undefined ? linkType : issueLink.link_type;

    // Выполняем валидацию статусов с учетом возможных изменений
    await this.validateLinkStatuses(validationSourceIssueId, validationTargetIssueId, validationLinkType);

    // Если в DTO переданы ID задач для обновления, находим их
    if (sourceIssueId !== undefined) {
      const sourceIssue = await this.issueRepository.findOne({ where: { ID: sourceIssueId } });
      if (!sourceIssue) {
        throw new NotFoundException(`Исходная задача с ID ${sourceIssueId} не найдена.`);
      }
      issueLink.source_issue = sourceIssue;
    }

    if (targetIssueId !== undefined) {
      const targetIssue = await this.issueRepository.findOne({ where: { ID: targetIssueId } });
      if (!targetIssue) {
        throw new NotFoundException(`Целевая задача с ID ${targetIssueId} не найдена.`);
      }
      issueLink.target_issue = targetIssue;
    }

    if (linkType !== undefined) {
      issueLink.link_type = linkType;
    }

    // Сохраняем обновленную сущность
    return this.issueLinkRepository.save(issueLink);
  }

  /**
   * Удаляет связь задачи по её ID.
   * @param id ID связи задачи для удаления.
   */
  async deleteIssueLink(id: number): Promise<void> {
    const result = await this.issueLinkRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Связь задачи с ID ${id} не найдена.`);
    }
  }

  /**
   * Получает все связи, где данная задача является исходной.
   * @param issueId ID задачи.
   * @returns Массив связей.
   */
  async getLinksBySourceIssue(issueId: number): Promise<IssueLink[]> {
    const issue = await this.issueRepository.findOne({ where: { ID: issueId } });
    if (!issue) {
      throw new NotFoundException(`Задача с ID ${issueId} не найдена.`);
    }
    return this.issueLinkRepository.find({
      where: { source_issue: { ID: issueId } },
      relations: ['source_issue', 'target_issue'],
    });
  }

  /**
   * Получает все связи, где данная задача является целевой.
   * @param issueId ID задачи.
   * @returns Массив связей.
   */
  async getLinksByTargetIssue(issueId: number): Promise<IssueLink[]> {
    const issue = await this.issueRepository.findOne({ where: { ID: issueId } });
    if (!issue) {
      throw new NotFoundException(`Задача с ID ${issueId} не найдена.`);
    }
    return this.issueLinkRepository.find({
      where: { target_issue: { ID: issueId } },
      relations: ['source_issue', 'target_issue'],
    });
  }



  /**
* Валидирует допустимость создания или существования связи задач
* на основе статусов исходной и целевой задач.
* @param sourceIssueId ID исходной задачи.
* @param targetIssueId ID целевой задачи.
* @param linkType Тип связи.
* @throws BadRequestException Если связь недопустима.
*/
  async validateLinkStatuses(
    sourceIssueId: number,
    targetIssueId: number,
    linkType: LinkType,
  ): Promise<void> {
    // Находим исходную и целевую задачи с их статусами
    const sourceIssue = await this.issueRepository.findOne({
      where: { ID: sourceIssueId },
      relations: ['status'], // Загружаем связанный статус
    });

    const targetIssue = await this.issueRepository.findOne({
      where: { ID: targetIssueId },
      relations: ['status'], // Загружаем связанный статус
    });

    if (!sourceIssue) {
      throw new NotFoundException(`Исходная задача с ID ${sourceIssueId} не найдена.`);
    }
    if (!targetIssue) {
      throw new NotFoundException(`Целевая задача с ID ${targetIssueId} не найдена.`);
    }

    const sourceStatus = sourceIssue.status;
    const targetStatus = targetIssue.status;

    if (!sourceStatus) {
      throw new BadRequestException(`Исходная задача с ID ${sourceIssueId} не имеет статуса.`);
    }
    if (!targetStatus) {
      throw new BadRequestException(`Целевая задача с ID ${targetIssueId} не имеет статуса.`);
    }

    // Логика валидации на основе LinkType и флагов статуса
    switch (linkType) {
      case LinkType.FS: // Finish-Start (Окончание исходной задачи -> Начало целевой задачи)
        // Проверка: Если исходная задача еще не завершена,
        // то целевая задача не должна быть в статусе "в процессе" или "завершено".
        if (!sourceStatus.is_finished && (targetStatus.on_process || targetStatus.is_finished)) {
          throw new BadRequestException(
            `Невозможно создать связь ${linkType}: Целевая задача (ID: ${targetIssueId}) уже находится в процессе или завершена, хотя исходная задача (ID: ${sourceIssueId}) еще не завершена.`,
          );
        }
        // Если исходная задача уже завершена, ограничений на статус целевой задачи нет.
        break;

      case LinkType.SS: // Start-Start (Начало исходной задачи -> Начало целевой задачи)
        // Проверка: Если исходная задача еще не в процессе и не завершена,
        // то целевая задача не должна быть в статусе "в процессе" или "завершено".
        if (!sourceStatus.on_process && !sourceStatus.is_finished && (targetStatus.on_process || targetStatus.is_finished)) {
          throw new BadRequestException(
            `Невозможно создать связь ${linkType}: Целевая задача (ID: ${targetIssueId}) уже находится в процессе или завершена, хотя исходная задача (ID: ${sourceIssueId}) еще не в процессе и не завершена.`,
          );
        }
        // Если исходная задача уже в процессе или завершена, ограничений на статус целевой задачи нет.
        break;

      case LinkType.FF: // Finish-Finish (Окончание исходной задачи -> Окончание целевой задачи)
        // Проверка: Если исходная задача еще не завершена,
        // то целевая задача не должна быть в статусе "завершено".
        if (!sourceStatus.is_finished && targetStatus.is_finished) {
          throw new BadRequestException(
            `Невозможно создать связь ${linkType}: Целевая задача (ID: ${targetIssueId}) уже завершена, хотя исходная задача (ID: ${sourceIssueId}) еще не завершена.`,
          );
        }
        // Если исходная задача уже завершена, ограничений на статус целевой задачи нет.
        break;

      case LinkType.SF: // Start-Finish (Начало исходной задачи -> Окончание целевой задачи)
        // Проверка: Если исходная задача еще не в процессе и не завершена,
        // то целевая задача не должна быть в статусе "завершено".
        if (!sourceStatus.on_process && !sourceStatus.is_finished && targetStatus.is_finished) {
          throw new BadRequestException(
            `Невозможно создать связь ${linkType}: Целевая задача (ID: ${targetIssueId}) уже завершена, хотя исходная задача (ID: ${sourceIssueId}) еще не в процессе и не завершена.`,
          );
        }
        // Если исходная задача уже в процессе или завершена, ограничений на статус целевой задачи нет.
        break;

      default:
        // Этот случай не должен наступить при правильном использовании enum
        throw new BadRequestException(`Неизвестный тип связи: ${linkType}`);
    }

    // Если валидация прошла успешно, метод просто завершается без исключений.
  }


  /**
   * Проверяет допустимость изменения статуса задачи на основе её связей.
   * Вызывается перед фактическим изменением статуса.
   * @param issueId ID задачи, статус которой изменяется.
   * @param newStatusId ID нового статуса задачи.
   * @throws BadRequestException Если изменение статуса нарушает существующие связи.
   */
  async validateStatusChange(issueId: number, newStatusId: number): Promise<void> {
    // Находим задачу и новый статус
    const issueToUpdate = await this.issueRepository.findOne({
      where: { ID: issueId },
      relations: ['status'], // Загружаем текущий статус
    });

    if (!issueToUpdate) {
      throw new NotFoundException(`Задача с ID ${issueId} не найдена.`);
    }

    const newStatus = await this.statusRepository.findOne({
      where: { ID: newStatusId },
    });

    if (!newStatus) {
      throw new NotFoundException(`Новый статус с ID ${newStatusId} не найден.`);
    }

    // Получаем все связи, где данная задача является исходной или целевой
    const outgoingLinks = await this.issueLinkRepository.find({
      where: { source_issue: { ID: issueId } },
      relations: ['target_issue', 'target_issue.status'], // Загружаем целевую задачу и её статус
    });

    const incomingLinks = await this.issueLinkRepository.find({
      where: { target_issue: { ID: issueId } },
      relations: ['source_issue', 'source_issue.status'], // Загружаем исходную задачу и её статус
    });

    // Проверяем исходящие связи
    for (const link of outgoingLinks) {
      const targetStatus = link.target_issue.status;
      if (!targetStatus) {
        // Это может указывать на проблему с данными, но для надежности проверим
        console.warn(`Целевая задача с ID ${link.target_issue.ID} в связи ${link.ID} не имеет статуса.`);
        continue; // Пропускаем эту связь
      }

      switch (link.link_type) {
        case LinkType.FS: // Finish-Start (Окончание исходной -> Начало целевой)
          // Если новый статус исходной задачи не "завершен", но целевая задача уже в процессе,
          // это может быть проблемой (хотя FS обычно означает, что целевая не может начаться ДО завершения исходной).
          // Главная проверка: если исходная переходит из "завершено" в другое, а целевая еще не завершена,
          // это может нарушить логику зависимости.
          // Проверка: Если новый статус не is_finished, то целевая задача не должна быть в on_process или is_finished.
          if (!newStatus.is_finished && (targetStatus.on_process || targetStatus.is_finished)) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.target_issue.ID} требует, чтобы исходная задача была завершена, если целевая уже в процессе или завершена.`,
            );
          }
          break;

        case LinkType.SS: // Start-Start (Начало исходной -> Начало целевой)
          // Если новый статус исходной задачи не "в процессе" и не "завершен", но целевая задача уже в процессе,
          // это может нарушить логику зависимости (целевая не может начаться ДО начала исходной).
          // Проверка: Если новый статус не on_process и не is_finished, то целевая задача не должна быть в on_process или is_finished.
          if (!newStatus.on_process && !newStatus.is_finished && (targetStatus.on_process || targetStatus.is_finished)) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.target_issue.ID} требует, чтобы исходная задача была в процессе или завершена, если целевая уже в процессе или завершена.`,
            );
          }
          break;

        case LinkType.FF: // Finish-Finish (Окончание исходной -> Окончание целевой)
          // Если новый статус исходной задачи не "завершен", но целевая задача уже завершена,
          // это нарушает логику зависимости.
          // Проверка: Если новый статус не is_finished, то целевая задача не должна быть is_finished.
          if (!newStatus.is_finished && targetStatus.is_finished) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.target_issue.ID} требует, чтобы исходная задача была завершена, если целевая уже завершена.`,
            );
          }
          break;

        case LinkType.SF: // Start-Finish (Начало исходной -> Окончание целевой)
          // Если новый статус исходной задачи не "в процессе" и не "завершен", но целевая задача уже завершена,
          // это нарушает логику зависимости.
          // Проверка: Если новый статус не on_process и не is_finished, то целевая задача не должна быть is_finished.
          if (!newStatus.on_process && !newStatus.is_finished && targetStatus.is_finished) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.target_issue.ID} требует, чтобы исходная задача была в процессе или завершена, если целевая уже завершена.`,
            );
          }
          break;
      }
    }

    // Проверяем входящие связи
    for (const link of incomingLinks) {
      const sourceStatus = link.source_issue.status;
      if (!sourceStatus) {
        // Это может указывать на проблему с данными, но для надежности проверим
        console.warn(`Исходная задача с ID ${link.source_issue.ID} в связи ${link.ID} не имеет статуса.`);
        continue; // Пропускаем эту связь
      }

      switch (link.link_type) {
        case LinkType.FS: // Finish-Start (Окончание исходной -> Начало целевой)
          // Если новый статус целевой задачи "в процессе" или "завершен", но исходная задача еще не завершена,
          // это нарушает логику зависимости.
          // Проверка: Если новый статус on_process или is_finished, то исходная задача должна быть is_finished.
          if ((newStatus.on_process || newStatus.is_finished) && !sourceStatus.is_finished) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.source_issue.ID} требует, чтобы исходная задача была завершена, прежде чем целевая перейдет в статус "в процессе" или "завершено".`,
            );
          }
          break;

        case LinkType.SS: // Start-Start (Начало исходной -> Начало целевой)
          // Если новый статус целевой задачи "в процессе" или "завершен", но исходная задача еще не в процессе и не завершена,
          // это нарушает логику зависимости.
          // Проверка: Если новый статус on_process или is_finished, то исходная задача должна быть on_process или is_finished.
          if ((newStatus.on_process || newStatus.is_finished) && (!sourceStatus.on_process && !sourceStatus.is_finished)) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.source_issue.ID} требует, чтобы исходная задача была в процессе или завершена, прежде чем целевая перейдет в статус "в процессе" или "завершено".`,
            );
          }
          break;

        case LinkType.FF: // Finish-Finish (Окончание исходной -> Окончание целевой)
          // Если новый статус целевой задачи "завершен", но исходная задача еще не завершена,
          // это нарушает логику зависимости.
          // Проверка: Если новый статус is_finished, то исходная задача должна быть is_finished.
          if (newStatus.is_finished && !sourceStatus.is_finished) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.source_issue.ID} требует, чтобы исходная задача была завершена, прежде чем целевая перейдет в статус "завершено".`,
            );
          }
          break;

        case LinkType.SF: // Start-Finish (Начало исходной -> Окончание целевой)
          // Если новый статус целевой задачи "завершен", но исходная задача еще не в процессе и не завершена,
          // это нарушает логику зависимости.
          // Проверка: Если новый статус is_finished, то исходная задача должна быть on_process или is_finished.
          if (newStatus.is_finished && (!sourceStatus.on_process && !sourceStatus.is_finished)) {
            throw new BadRequestException(
              `Невозможно изменить статус задачи ${issueId} на "${newStatus.title}": Связь ${link.ID} (${link.link_type}) с задачей ${link.source_issue.ID} требует, чтобы исходная задача была в процессе или завершена, прежде чем целевая перейдет в статус "завершено".`,
            );
          }
          break;
      }
    }
    // Если все проверки пройдены, изменение статуса допустимо.
  }
}
