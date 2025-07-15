import { Group } from "src/groups/entities/group.entity";
import { PermissionKey } from "src/init/entities/PermissionKeys.entity";
import { PermissionScheme } from "src/permission-scheme/entities/permission-scheme.entity";
import { ProjectRole } from "src/project-role/entities/project-role.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum PermissionSchemeKeys {
  BROWSE_PROJECTS = "BROWSE_PROJECTS",//Возможность просматривать проекты и запросы в них.
  MANAGE_SPRINTS_PERMISSION = "MANAGE_SPRINTS_PERMISSION",//Возможность управления спринтами.
  VIEW_READONLY_WORKFLOW = "VIEW_READONLY_WORKFLOW",
  ASSIGNABLE_USER = "ASSIGNABLE_USER",//Пользователи с этими правами доступа могут быть назначены на запросы.
  ASSIGN_ISSUES = "ASSIGN_ISSUES",//Возможность назначать запросы другим пользователям.
  CLOSE_ISSUES = "CLOSE_ISSUES",//Возможность закрывать запросы. Часто полезна, когда сотрудники разрешают зарпросы, а, например, отдел качества закрывает их.
  CREATE_ISSUES = "CREATE_ISSUES",//Возможность создавать запросы.
  ADMINISTER_PROJECTS = "ADMINISTER_PROJECTS",//Возможность администрировать проект
  DELETE_ISSUES = "DELETE_ISSUES",//Возможность удалять запросы.
  EDIT_ISSUES = "EDIT_ISSUES",//Возможность редактировать запросы.
  LINK_ISSUES = "LINK_ISSUES",//Возможность связывать запросы вместе и создавать связанные запросы. Полезно если функция связывания включена.
  MODIFY_AUTHOR = "MODIFY_AUTHOR",//Возможность изменять автора при создании и изменении запроса.
  //MOVE_ISSUES = "MOVE_ISSUES",
  RESOLVE_ISSUES = "RESOLVE_ISSUES",//Возможность разрешать и открывать заново запросы. Так же включает возможность устанавливать версию в которой запрос должен быть решен.
  SCHEDULE_ISSUES = "SCHEDULE_ISSUES",//Возможность просматривать или редактировать ожидаемый срок исполнения запроса
  SET_ISSUE_SECURITY = "SET_ISSUE_SECURITY",//Возможность устанавливать уровень безопасности запроса, чтобы только пользователи с этим уровнем безопасности могли видеть этот запрос.
  TRANSITION_ISSUES = "TRANSITION_ISSUES",//Возможность перемещать задачи между статусами
  MANAGE_WATCHERS = "MANAGE_WATCHERS", //Возможность управления списком наблюдателей по запросу.
  VIEW_VOTERS_AND_WATCHERS = "VIEW_VOTERS_AND_WATCHERS", //Возможность просмотра списка голосующих и наблюдателей по запросу.
  ADD_COMMENTS = "ADD_COMMENTS", //Возможность комментировать запросы.
  DELETE_ALL_COMMENTS = "DELETE_ALL_COMMENTS", //Возможность удалять все комментарии сделанные в запросе.
  DELETE_OWN_COMMENTS = "DELETE_OWN_COMMENTS", //Возможность удалять собственные комментарии по запросу.
  EDIT_ALL_COMMENTS = "EDIT_ALL_COMMENTS", //Возможность редактировать все комментарии оставленные в запросе.
  EDIT_OWN_COMMENTS = "EDIT_OWN_COMMENTS", //Возможность редактировать собственные комментарии по запросу.
  CREATE_ATTACHMENTS = "CREATE_ATTACHMENTS", //Пользователи с этими правами доступа могут создавать вложения.
  DELETE_ALL_ATTACHMENTS = "DELETE_ALL_ATTACHMENTS", //Пользователи с этим правом могут удалять все вложения.
  DELETE_OWN_ATTACHMENTS = "DELETE_OWN_ATTACHMENTS", //Пользователи с этим правом могут удалять собственные вложения.
  DELETE_ALL_WORKLOGS = "DELETE_ALL_WORKLOGS", // Возможность удалять все журналы работ по запросам.
  DELETE_OWN_WORKLOGS = "DELETE_OWN_WORKLOGS", // Возможность удалять собственные журналы работ по запросам.
  EDIT_ALL_WORKLOGS = "EDIT_ALL_WORKLOGS", //Возможность редактировать все журналы работ по запросам.
  EDIT_OWN_WORKLOGS = "EDIT_OWN_WORKLOGS", //Возможсть редактировать собственный журнал работ по запросам.
  PROJECT_LOG_WORK_FOR_OTHERS = "PROJECT_LOG_WORK_FOR_OTHERS",
  PROJECT_VIEW_ALL_WORKLOGS = "PROJECT_VIEW_ALL_WORKLOGS",
  WORK_ON_ISSUES = "WORK_ON_ISSUES", //Возможность журналирования работ по запросу. Полезно если функция учета времени активирована.
}
export enum PermissionSchemeDescriptions {
  BROWSE_PROJECTS = "Возможность просматривать проекты и запросы в них",
  MANAGE_SPRINTS_PERMISSION = "Возможность управления спринтами",
  VIEW_READONLY_WORKFLOW = "Пользователи с указанными правами доступа могут только просматривать бизнесс процесс",
  ASSIGNABLE_USER = "Пользователи с этими правами доступа могут быть назначены на запросы",
  ASSIGN_ISSUES = "Возможность назначать запросы другим пользователям",
  CLOSE_ISSUES = "Возможность закрывать запросы. Часто полезна, когда сотрудники разрешают зарпросы, а, например, отдел качества закрывает их",
  CREATE_ISSUES = "Возможность создавать запросы",
  ADMINISTER_PROJECTS = "Возможность администрировать проект",
  DELETE_ISSUES = "Возможность удалять запросы",
  EDIT_ISSUES = "Возможность редактировать запросы",
  LINK_ISSUES = "Возможность связывать запросы вместе и создавать связанные запросы. Полезно если функция связывания включена",
  MODIFY_AUTHOR = "Возможность изменять автора при создании и изменении запроса",
  //MOVE_ISSUES = "MOVE_ISSUES",
  RESOLVE_ISSUES = "Возможность разрешать и открывать заново запросы. Так же включает возможность устанавливать версию в которой запрос должен быть решен.",
  SCHEDULE_ISSUES = "Возможность просматривать или редактировать ожидаемый срок исполнения запроса",
  SET_ISSUE_SECURITY = "Возможность устанавливать уровень безопасности запроса, чтобы только пользователи с этим уровнем безопасности могли видеть этот запрос.",
  TRANSITION_ISSUES = "Возможность перемещать задачи между статусами",
  MANAGE_WATCHERS = "Возможность управления списком наблюдателей по запросу",
  VIEW_VOTERS_AND_WATCHERS = "Возможность просмотра списка голосующих и наблюдателей по запросу",
  ADD_COMMENTS = "Возможность комментировать запросы",
  DELETE_ALL_COMMENTS = "Возможность удалять все комментарии сделанные в запросе",
  DELETE_OWN_COMMENTS = "Возможность удалять собственные комментарии по запросу",
  EDIT_ALL_COMMENTS = "Возможность редактировать все комментарии оставленные в запросе",
  EDIT_OWN_COMMENTS = "Возможность редактировать собственные комментарии по запросу",
  CREATE_ATTACHMENTS = "Пользователи с этими правами доступа могут создавать вложения",
  DELETE_ALL_ATTACHMENTS = "Пользователи с этим правом могут удалять все вложения.",
  DELETE_OWN_ATTACHMENTS = "Пользователи с этим правом могут удалять собственные вложения.",
  DELETE_ALL_WORKLOGS = "Возможность удалять все журналы работ по запросам.",
  DELETE_OWN_WORKLOGS = "Возможность удалять собственные журналы работ по запросам.",
  EDIT_ALL_WORKLOGS = "Возможность редактировать все журналы работ по запросам.",
  EDIT_OWN_WORKLOGS = "Возможсть редактировать собственный журнал работ по запросам.",
  PROJECT_LOG_WORK_FOR_OTHERS = "PROJECT_LOG_WORK_FOR_OTHERS",
  PROJECT_VIEW_ALL_WORKLOGS = "PROJECT_VIEW_ALL_WORKLOGS",
  WORK_ON_ISSUES = "WORK_ON_ISSUES",
}
export enum PermissionSchemeNames {
  BROWSE_PROJECTS = "Просмотр проектов",
  MANAGE_SPRINTS_PERMISSION = "Управление спринтами",
  VIEW_READONLY_WORKFLOW = "Посмотреть Workflow только для чтения",
  ASSIGNABLE_USER = "Назначаемые пользователи",
  ASSIGN_ISSUES = "Назначение запросов",
  CLOSE_ISSUES = "Закрытие запросов",
  CREATE_ISSUES = "Создание запросов",
  ADMINISTER_PROJECTS = "Администрирование проекта",
  DELETE_ISSUES = "Удалить запросы",
  EDIT_ISSUES = "Редактировать запросы",
  LINK_ISSUES = "Связь запросов",
  MODIFY_AUTHOR = "Изменения автора",
  //MOVE_ISSUES = "MOVE_ISSUES",
  RESOLVE_ISSUES = "Решение запросов",
  SCHEDULE_ISSUES = "Планирование запросов",
  SET_ISSUE_SECURITY = "Установка безопасности запросов",
  TRANSITION_ISSUES = "Переходы запросов",
  MANAGE_WATCHERS = "Управление списком наблюдателей",
  VIEW_VOTERS_AND_WATCHERS = "Просмотр наблюдателей и голосующих",
  ADD_COMMENTS = "Добавление комментариев",
  DELETE_ALL_COMMENTS = "Удаление всех комментариев",
  DELETE_OWN_COMMENTS = "Удаление собственных комментариев",
  EDIT_ALL_COMMENTS = "Редактирование всех комментариев",
  EDIT_OWN_COMMENTS = "Редактирование собственных комментариев",
  CREATE_ATTACHMENTS = "Создание вложений",
  DELETE_ALL_ATTACHMENTS = "Удаление всех вложений",
  DELETE_OWN_ATTACHMENTS = "Удаление собственных вложений",
  DELETE_ALL_WORKLOGS = "Удаление всех журналов работ",
  DELETE_OWN_WORKLOGS = "Удаление персонального журнала работ",
  EDIT_ALL_WORKLOGS = "Редактирование всех журналов работ",
  EDIT_OWN_WORKLOGS = "Редактирование персонального журнала работ",
  PROJECT_LOG_WORK_FOR_OTHERS = "PROJECT_LOG_WORK_FOR_OTHERS",
  PROJECT_VIEW_ALL_WORKLOGS = "PROJECT_VIEW_ALL_WORKLOGS",
  WORK_ON_ISSUES = "Работа над запросами",
}
@Entity()
export class PermissionSchemeRule {
  @PrimaryGeneratedColumn()
  ID: number

  @ManyToOne(() => PermissionScheme, scheme => scheme.permissionSchemeRule, { onDelete: "CASCADE", nullable: true })
  permissionScheme: PermissionScheme

  @ManyToOne(() => PermissionKey, key => key.permissionSchemeRule, { nullable: true })
  permissionKey: PermissionKey

  @JoinTable({ name: "permission_scheme_rule_users" })
  @ManyToMany(() => User, { cascade: true })
  user: User[]

  @JoinTable({ name: "permission_scheme_rule_group" })
  @ManyToMany(() => Group, { cascade: true, eager: true })
  group: Group[];

  @JoinTable({ name: "permission_scheme_rule_project_role" })
  @ManyToMany(() => ProjectRole, { eager: true, cascade: true })
  projectRole: ProjectRole[];

  @Column({ type: "boolean", nullable: true })
  is_Project_Lead: boolean

  @Column({ type: "boolean", nullable: true })
  is_Assegnee: boolean

  @Column({ type: "boolean", nullable: true })
  is_Owner: boolean
}
