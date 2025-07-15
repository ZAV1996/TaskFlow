/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AddMemberInRoleInput = {
  members: Array<InputId>;
  project: InputId;
  role: InputId;
};

export type BoardType = {
  __typename?: 'BoardType';
  ID: Scalars['Int']['output'];
  Owner?: Maybe<User>;
  board_name: Scalars['String']['output'];
  board_type?: Maybe<Board_Type>;
  columns?: Maybe<Array<ColumnBoardType>>;
  create_date?: Maybe<Scalars['DateTime']['output']>;
  filter?: Maybe<FilterType>;
  update_date?: Maybe<Scalars['DateTime']['output']>;
};

export type BoardUpdateInput = {
  ID: Scalars['Int']['input'];
  Owner: InputId;
  board_name: Scalars['String']['input'];
  columns?: InputMaybe<Array<InputId>>;
  filter?: InputMaybe<InputId>;
};

export type ChangePasswordInput = {
  ID: Scalars['Int']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  repeatNewPassword: Scalars['String']['input'];
};

export type ColumnBoardType = {
  __typename?: 'ColumnBoardType';
  ID?: Maybe<Scalars['Int']['output']>;
  board: BoardType;
  column_name?: Maybe<Scalars['String']['output']>;
  column_position: Scalars['Int']['output'];
  statuses?: Maybe<Array<StatusType>>;
};

export type CondInput = {
  /** Флаг исполнителя задачи */
  asignee?: InputMaybe<Scalars['Boolean']['input']>;
  /** Флаг авторa задачи */
  author?: InputMaybe<Scalars['Boolean']['input']>;
  /** Группы пользователей */
  groups?: InputMaybe<Array<InputId>>;
  /** Список выбранных пользователей */
  users?: InputMaybe<Array<InputUser>>;
};

export type CondType = {
  __typename?: 'CondType';
  /** Идентификатор правила перехода на статус */
  ID: Scalars['Int']['output'];
  /** Исполнитель задачи */
  asignee?: Maybe<Scalars['Boolean']['output']>;
  /** Автор задачи */
  author?: Maybe<Scalars['Boolean']['output']>;
  /** Группы пользователей */
  groups?: Maybe<Array<GroupType>>;
  /** Идентификатор родительского статуса */
  parent?: Maybe<StatusType>;
  /** Список выбранных пользователей */
  users?: Maybe<Array<User>>;
};

export type ConditionGroup = {
  conditions: Array<ConditionItem>;
  logicalOperator: LogicalOperator;
};

export type ConditionItem = {
  field: FieldType;
  functionCall?: InputMaybe<FunctionCall>;
  operator: Operator;
  valueArrayNumber?: InputMaybe<Array<Scalars['Int']['input']>>;
  valueInputID?: InputMaybe<InputId>;
  valueInputIDArray?: InputMaybe<Array<InputId>>;
  valueNumber?: InputMaybe<Scalars['Int']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type ConditionType = {
  __typename?: 'ConditionType';
  field?: Maybe<Scalars['String']['output']>;
  operator?: Maybe<Operator>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ConfirmInput = {
  activationToken: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CreateColumnInput = {
  board: InputId;
  column_name?: InputMaybe<Scalars['String']['input']>;
  column_position?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateGroupInput = {
  /** Описание группы */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Название группы */
  group_name: Scalars['String']['input'];
};

export type CreateIssueInput = {
  assignee?: InputMaybe<InputId>;
  author: InputId;
  components?: InputMaybe<Array<InputId>>;
  description?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['DateTime']['input']>;
  issueType: InputId;
  parentIssue?: InputMaybe<InputId>;
  project: InputId;
  title: Scalars['String']['input'];
};

export type CreateIssueLinkInput = {
  linkType: LinkType;
  sourceIssueId: Scalars['Int']['input'];
  targetIssueId: Scalars['Int']['input'];
};

export type CreateOrUpdateCondInput = {
  ID?: InputMaybe<Scalars['Int']['input']>;
  /** Флаг исполнителя задачи */
  asignee?: InputMaybe<Scalars['Boolean']['input']>;
  /** Флаг авторa задачи */
  author?: InputMaybe<Scalars['Boolean']['input']>;
  /** Группы пользователей */
  groups?: InputMaybe<Array<InputId>>;
  /** Список выбранных пользователей */
  users?: InputMaybe<Array<InputUser>>;
};

export type CreateOrUpdateStatusInput = {
  /** Идентификатор статуса */
  ID?: InputMaybe<Scalars['Int']['input']>;
  /** Доступ для перехода на этот статус */
  cond?: InputMaybe<CondInput>;
  /** Конечный статус */
  is_finished?: InputMaybe<Scalars['Boolean']['input']>;
  /** Начальный статус */
  is_initial?: InputMaybe<Scalars['Boolean']['input']>;
  /** Cтатус в процессе */
  on_process?: InputMaybe<Scalars['Boolean']['input']>;
  /** Идентификатор родительского бизнес-процесса */
  parent: InputId;
  status_meta?: InputMaybe<StatusMetaInput>;
  /** Название статуса */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePermissionSchemeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateProjectComponentInput = {
  defaultExecuter?: InputMaybe<InputId>;
  description?: InputMaybe<Scalars['String']['input']>;
  issues?: InputMaybe<Array<InputId>>;
  owner?: InputMaybe<InputId>;
  parent: InputId;
  title: Scalars['String']['input'];
};

export type CreateProjectInput = {
  /** Описание проекта */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Изображение проекта */
  image?: InputMaybe<Scalars['Upload']['input']>;
  /** Ключ проекта */
  key: Scalars['String']['input'];
  /** Руководитель проекта */
  lead: Scalars['Int']['input'];
  /** Имя проекта */
  project_name: Scalars['String']['input'];
};

export type CreateProjectRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateRiskInput = {
  /** ID проекта */
  Project: InputId;
  /** Категория риска */
  category: Scalars['String']['input'];
  /** Описание риска */
  description: Scalars['String']['input'];
  /** Влияние/Воздействие риска на проект от 1 до 5 */
  impact: Scalars['Float']['input'];
  /** План действий для уменьшения возникновения этого риска */
  mitigationPlan: Scalars['String']['input'];
  /** Вероятность риска от 0 до 1 */
  probability: Scalars['Float']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  patronymic: Scalars['String']['input'];
  surname: Scalars['String']['input'];
};

export type CreateWorkflowInput = {
  /** Описание бизнес-процесса */
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DeviceType = {
  __typename?: 'DeviceType';
  ip: Scalars['String']['output'];
  userAgent: Scalars['String']['output'];
};

export enum FieldType {
  Assignee = 'ASSIGNEE',
  Author = 'AUTHOR',
  ChildrenIssues = 'CHILDREN_ISSUES',
  Components = 'COMPONENTS',
  Description = 'DESCRIPTION',
  FixVersion = 'FIX_VERSION',
  Id = 'ID',
  IssueNum = 'ISSUE_NUM',
  IssueType = 'ISSUE_TYPE',
  Key = 'KEY',
  ParentIssue = 'PARENT_ISSUE',
  Priority = 'PRIORITY',
  Project = 'PROJECT',
  Title = 'TITLE'
}

export type FileEntity = {
  __typename?: 'FileEntity';
  ID: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  mimetype?: Maybe<MimeType>;
  originalName?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  relatedEntityId?: Maybe<Scalars['Int']['output']>;
  relatedEntityType?: Maybe<RelatedEntityType>;
  size?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploadedBy?: Maybe<User>;
  url: Scalars['String']['output'];
};

export enum FileType {
  CommentAttachment = 'COMMENT_ATTACHMENT',
  IssueAttachment = 'ISSUE_ATTACHMENT',
  ProjectImage = 'PROJECT_IMAGE',
  SystemImage = 'SYSTEM_IMAGE',
  UserAvatar = 'USER_AVATAR',
  UserPhoto = 'USER_PHOTO'
}

export type FilterInput = {
  board?: InputMaybe<InputId>;
  conditions: Array<ConditionGroup>;
  logicalOperator: LogicalOperator;
  orderBy?: InputMaybe<OrderByInput>;
  owner: InputId;
  title: Scalars['String']['input'];
};

export type FilterType = {
  __typename?: 'FilterType';
  ID: Scalars['Int']['output'];
  conditions: Array<ConditionType>;
  logicalOperator?: Maybe<Scalars['String']['output']>;
  owner: User;
  sort?: Maybe<Array<SortType>>;
  title: Scalars['String']['output'];
};

export type ForgotPassInput = {
  /** Адрес электронной почты пользователя */
  email: Scalars['String']['input'];
};

export enum FunctionCall {
  ClosedSprints = 'CLOSED_SPRINTS',
  CurrentUser = 'CURRENT_USER',
  MembersOf = 'MEMBERS_OF',
  Now = 'NOW',
  ReleasedVersions = 'RELEASED_VERSIONS',
  UnreleasedVersion = 'UNRELEASED_VERSION',
  UpdatedBy = 'UPDATED_BY'
}

export type GetProjectRoleMemberInput = {
  project: InputId;
  role: InputId;
};

export type GroupMemberInput = {
  groupID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};

export type GroupType = {
  __typename?: 'GroupType';
  /** Идентификатор группы */
  ID: Scalars['Int']['output'];
  /** Дата и время создания группы */
  create_date: Scalars['DateTime']['output'];
  /** Описание группы */
  description?: Maybe<Scalars['String']['output']>;
  /** Название группы */
  group_name: Scalars['String']['output'];
  /** Дата и время последнего обновления группы */
  updated_date?: Maybe<Scalars['DateTime']['output']>;
};

export enum HandleTypeId {
  Sb = 'SB',
  Sr = 'SR',
  St = 'ST',
  Tb = 'TB',
  Tl = 'TL',
  Tt = 'TT'
}

export type InputId = {
  ID: Scalars['Int']['input'];
};

export type InputUser = {
  /** Идентификатор пользователя */
  ID?: InputMaybe<Scalars['Int']['input']>;
  /** Адрес электронной почты пользователя */
  email?: InputMaybe<Scalars['String']['input']>;
};

export type IssueLinkType = {
  __typename?: 'IssueLinkType';
  ID: Scalars['Int']['output'];
  link_type: LinkType;
  source_issue: IssueType;
  target_issue: IssueType;
};

export type IssueType = {
  __typename?: 'IssueType';
  /** Идентификатор запроса */
  ID?: Maybe<Scalars['Int']['output']>;
  /** Исполнитель для работы над запросом */
  assignee?: Maybe<User>;
  /** Пользователь, который внес запрос в систему */
  author?: Maybe<User>;
  /** Дочерние запросы */
  childrenIssues?: Maybe<Array<IssueType>>;
  /** Компоненты в рамках проекта, которые связанны с данным запросом */
  components?: Maybe<Array<ProjectComponentType>>;
  /** Дата и время создания запроса */
  create_date: Scalars['DateTime']['output'];
  /** Описание запроса */
  description?: Maybe<Scalars['String']['output']>;
  /** Срок исполнения запроса */
  due_date?: Maybe<Scalars['DateTime']['output']>;
  /** Номер запроса */
  issueNum: Scalars['Int']['output'];
  /** Тип запроса */
  issueType?: Maybe<IssueTypeEntity>;
  /** Ключ запроса */
  key?: Maybe<Scalars['String']['output']>;
  /** Родительская запрос */
  parentIssue?: Maybe<IssueType>;
  /** Приоритет запроса */
  priority?: Maybe<Scalars['String']['output']>;
  /** Проект, к которому принадлежит запрос */
  project?: Maybe<ProjectType>;
  /** Текущее состояние запроса */
  status: StatusType;
  /** Сводка */
  title?: Maybe<Scalars['String']['output']>;
  /** Дата и время последнего обновления запроса */
  update_date?: Maybe<Scalars['DateTime']['output']>;
};

export type IssueTypeEntity = {
  __typename?: 'IssueTypeEntity';
  ID: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  project?: Maybe<ProjectType>;
  workflow?: Maybe<WorkflowType>;
};

export enum LinkType {
  Ff = 'FF',
  Fs = 'FS',
  Sf = 'SF',
  Ss = 'SS'
}

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum MimeType {
  Jpeg = 'JPEG',
  Mp4 = 'MP4',
  Pdf = 'PDF',
  Png = 'PNG',
  Svg = 'SVG',
  Webp = 'WEBP',
  Zip = 'ZIP'
}

export type Mutation = {
  __typename?: 'Mutation';
  CreatePermissionScheme?: Maybe<PermissionSchemeType>;
  DeletePermissionScheme?: Maybe<Scalars['Boolean']['output']>;
  UpdatePermissionScheme?: Maybe<Scalars['Boolean']['output']>;
  addMemberInProjectRole: ProjectRoleMemberType;
  addUserInGroup: Array<User>;
  changePassword: User;
  confirm?: Maybe<Scalars['String']['output']>;
  createColumn: ColumnBoardType;
  createFilter: FilterType;
  createGroup: GroupType;
  createIssue: IssueType;
  createIssueLink: IssueLinkType;
  createOrUpdateCond: CondType;
  createProject: ProjectType;
  createProjectComponent: ProjectComponentType;
  createProjectRole: ProjectRoleType;
  createRisk: RiskType;
  createStatus: Array<StatusType>;
  createTransition: TransitionType;
  createUser: User;
  createWorkflow: WorkflowType;
  deleteBoard: Scalars['Boolean']['output'];
  deleteComponent: Array<Scalars['String']['output']>;
  deleteCond: Array<Scalars['String']['output']>;
  deleteFile: Scalars['Boolean']['output'];
  deleteFilter: Scalars['Boolean']['output'];
  deleteIssue: Scalars['Boolean']['output'];
  deleteProject?: Maybe<Scalars['Boolean']['output']>;
  deleteProjectRole: Scalars['Boolean']['output'];
  deleteStatus: Scalars['Boolean']['output'];
  deleteTransition: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteWorkflow: Scalars['Boolean']['output'];
  forgot?: Maybe<Scalars['String']['output']>;
  getIssueTypeByID: IssueTypeEntity;
  kill_all_sessions: Scalars['Boolean']['output'];
  kill_session: Scalars['Boolean']['output'];
  login: User;
  logout?: Maybe<Scalars['Boolean']['output']>;
  register: Scalars['String']['output'];
  removeGroup: Scalars['Boolean']['output'];
  removeRisk: Scalars['Boolean']['output'];
  removeUserFromGroup: Array<User>;
  setATransitionRule: TransitionType;
  setAvatar: User;
  updateBoard: BoardType;
  updateColumn: ColumnBoardType;
  updateComponent: ProjectComponentType;
  updateGroup: GroupType;
  updateIssue: IssueType;
  updateMyProfile: User;
  updatePass?: Maybe<Scalars['String']['output']>;
  updatePermissionRule: PermissionSchemeRuleType;
  updateProject: ProjectType;
  updateProjectRole: ProjectRoleType;
  updateRisk: RiskType;
  updateStatus: StatusType;
  updateUser: User;
  updateWorkflow: WorkflowType;
  uploadFile: FileEntity;
};


export type MutationCreatePermissionSchemeArgs = {
  Input: CreatePermissionSchemeInput;
};


export type MutationDeletePermissionSchemeArgs = {
  Input: InputId;
};


export type MutationUpdatePermissionSchemeArgs = {
  Input: InputId;
};


export type MutationAddMemberInProjectRoleArgs = {
  addMemberInProjectRole: AddMemberInRoleInput;
};


export type MutationAddUserInGroupArgs = {
  AddUserInGroup: GroupMemberInput;
};


export type MutationChangePasswordArgs = {
  Input: ChangePasswordInput;
};


export type MutationConfirmArgs = {
  ConfirmToken: ConfirmInput;
};


export type MutationCreateColumnArgs = {
  ColumnInput: CreateColumnInput;
};


export type MutationCreateFilterArgs = {
  input: FilterInput;
};


export type MutationCreateGroupArgs = {
  CreateGroupInput: CreateGroupInput;
};


export type MutationCreateIssueArgs = {
  Input: CreateIssueInput;
};


export type MutationCreateIssueLinkArgs = {
  Input: CreateIssueLinkInput;
};


export type MutationCreateOrUpdateCondArgs = {
  createOrUpdateCondInput: CreateOrUpdateCondInput;
};


export type MutationCreateProjectArgs = {
  Input: CreateProjectInput;
};


export type MutationCreateProjectComponentArgs = {
  Input: CreateProjectComponentInput;
};


export type MutationCreateProjectRoleArgs = {
  createProjectRole: CreateProjectRoleInput;
};


export type MutationCreateRiskArgs = {
  createRiskDto: CreateRiskInput;
};


export type MutationCreateStatusArgs = {
  createStatusInput: CreateOrUpdateStatusInput;
};


export type MutationCreateTransitionArgs = {
  createOrUpdateTransitionInput: PartialTransitionInput;
};


export type MutationCreateUserArgs = {
  CreateUser: CreateUserInput;
};


export type MutationCreateWorkflowArgs = {
  createWorkflowInput: CreateWorkflowInput;
};


export type MutationDeleteBoardArgs = {
  Delete: InputId;
};


export type MutationDeleteComponentArgs = {
  inputID: InputId;
};


export type MutationDeleteCondArgs = {
  deleteCondInput: InputId;
};


export type MutationDeleteFileArgs = {
  fileId: Scalars['Int']['input'];
};


export type MutationDeleteFilterArgs = {
  input: InputId;
};


export type MutationDeleteIssueArgs = {
  Input: InputId;
};


export type MutationDeleteProjectArgs = {
  Input: InputId;
};


export type MutationDeleteProjectRoleArgs = {
  id: InputId;
};


export type MutationDeleteStatusArgs = {
  deleteStatusInput: InputId;
};


export type MutationDeleteTransitionArgs = {
  Transition: InputId;
};


export type MutationDeleteUserArgs = {
  ID: Scalars['Int']['input'];
};


export type MutationDeleteWorkflowArgs = {
  Input: InputId;
};


export type MutationForgotArgs = {
  ForgotPassInput: ForgotPassInput;
};


export type MutationGetIssueTypeByIdArgs = {
  createIssueTypeInput: Scalars['Int']['input'];
};


export type MutationKill_SessionArgs = {
  session_uuid: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  LoginInput: LoginInput;
};


export type MutationRegisterArgs = {
  RegisterInput: RegisterInput;
};


export type MutationRemoveGroupArgs = {
  RemoveGroup: Scalars['Int']['input'];
};


export type MutationRemoveRiskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveUserFromGroupArgs = {
  removeUserFromGroup: GroupMemberInput;
};


export type MutationSetATransitionRuleArgs = {
  TransitionPermissionSchemeRule: TransitionPermissionSchemeRuleInput;
};


export type MutationSetAvatarArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationUpdateBoardArgs = {
  BoardUpdateInput: BoardUpdateInput;
};


export type MutationUpdateColumnArgs = {
  ColumnUpdateInput: UpdateColumnInput;
};


export type MutationUpdateComponentArgs = {
  updateProjectComponentInput: UpdateProjectComponentInput;
};


export type MutationUpdateGroupArgs = {
  UpdateGroupInput: UpdateGroupInput;
};


export type MutationUpdateIssueArgs = {
  Input: UpdateIssueInput;
};


export type MutationUpdateMyProfileArgs = {
  UpdateMyProfile: UpdateMyProfile;
};


export type MutationUpdatePassArgs = {
  ForgotPass: SetNewPassForgot;
};


export type MutationUpdatePermissionRuleArgs = {
  Input: UpdatePermissionSchemeRuleInput;
};


export type MutationUpdateProjectArgs = {
  Input: UpdateProjectInput;
};


export type MutationUpdateProjectRoleArgs = {
  updateProjectRole: ProjectRoleInput;
};


export type MutationUpdateRiskArgs = {
  id: Scalars['Float']['input'];
  updateRiskDto: UpdateRiskDto;
};


export type MutationUpdateStatusArgs = {
  createStatusInput: CreateOrUpdateStatusInput;
};


export type MutationUpdateUserArgs = {
  UpdateUser: UpdateUserInput;
};


export type MutationUpdateWorkflowArgs = {
  updateWorkflowInput: UpdateWorkflowInput;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  relatedEntityId?: InputMaybe<Scalars['Int']['input']>;
  relatedEntityType?: InputMaybe<RelatedEntityType>;
  type: FileType;
};

export enum Operator {
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  In = 'IN',
  IsNotNull = 'IS_NOT_NULL',
  IsNull = 'IS_NULL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  Like = 'LIKE',
  NotEquals = 'NOT_EQUALS',
  NotIn = 'NOT_IN'
}

export type OrderByInput = {
  field: FieldType;
  orderBy: SortOrder;
};

export type PartialTransitionInput = {
  ID?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<InputId>;
  title?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<InputId>;
  transition_meta?: InputMaybe<TransitionMetaInput>;
};

export type PermissionKeyType = {
  __typename?: 'PermissionKeyType';
  ID: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  permissionKey: Scalars['String']['output'];
  permissionName: Scalars['String']['output'];
  permissionSchemeRule: Array<PermissionSchemeRuleType>;
};

export type PermissionSchemeRuleType = {
  __typename?: 'PermissionSchemeRuleType';
  ID: Scalars['Int']['output'];
  group?: Maybe<Array<GroupType>>;
  is_Assegnee?: Maybe<Scalars['Boolean']['output']>;
  is_Owner?: Maybe<Scalars['Boolean']['output']>;
  is_Project_Lead?: Maybe<Scalars['Boolean']['output']>;
  permissionKey: PermissionKeyType;
  permissionScheme: PermissionSchemeType;
  projectRole?: Maybe<Array<ProjectRoleType>>;
  user?: Maybe<Array<User>>;
};

export type PermissionSchemeType = {
  __typename?: 'PermissionSchemeType';
  ID: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type ProjectComponentType = {
  __typename?: 'ProjectComponentType';
  ID: Scalars['Int']['output'];
  defaultExecuter?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  parent: ProjectType;
  title: Scalars['String']['output'];
};

export type ProjectRoleInput = {
  ID: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ProjectRoleMemberType = {
  __typename?: 'ProjectRoleMemberType';
  ID: Scalars['Int']['output'];
  members?: Maybe<Array<User>>;
  project: ProjectType;
  role: ProjectRoleType;
};

export type ProjectRoleType = {
  __typename?: 'ProjectRoleType';
  ID: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<ProjectRoleMemberType>>;
  name: Scalars['String']['output'];
};

export type ProjectType = {
  __typename?: 'ProjectType';
  /** id проекта */
  ID: Scalars['Int']['output'];
  /** Компоненты проекта */
  components?: Maybe<Array<ProjectComponentType>>;
  /** Описание проекта */
  description?: Maybe<Scalars['String']['output']>;
  /** Изображение проекта */
  image?: Maybe<FileEntity>;
  /** Типы задач проета */
  issue_types?: Maybe<IssueTypeEntity>;
  /** Задачи проекта */
  issues?: Maybe<Array<IssueType>>;
  /** Ключ проекта */
  key: Scalars['String']['output'];
  /** Руководитель проекта */
  lead?: Maybe<User>;
  permissionScheme?: Maybe<PermissionSchemeType>;
  /** Имя проекта */
  project_name: Scalars['String']['output'];
  /** Риски проекта */
  risk?: Maybe<Array<RiskType>>;
};

export type Query = {
  __typename?: 'Query';
  TEST: Scalars['Int']['output'];
  filterIssues?: Maybe<Array<IssueType>>;
  getAllBoard: Array<BoardType>;
  getAllConds: Array<CondType>;
  getAllFilters: Array<FilterType>;
  getAllGroups: Array<GroupType>;
  getAllIssueLink: Array<IssueLinkType>;
  getAllIssuesByProjectID?: Maybe<Array<IssueType>>;
  getAllProjects: Array<ProjectType>;
  getAllRisks: Array<RiskType>;
  getAllStatusesByProjectID: Array<StatusType>;
  getAllTransitionByStatus: Array<TransitionType>;
  getAllTransitionsByWorkflowID: Array<TransitionType>;
  getAllUsers?: Maybe<Array<User>>;
  getAllWorkflows: Array<WorkflowType>;
  getAllWorkflowsByProjectID: Array<WorkflowType>;
  getAvailableProjects: Array<ProjectType>;
  getBoardByID: BoardType;
  getColumnsByBoardID: Array<ColumnBoardType>;
  getCondByID: CondType;
  getCurrentUser: User;
  getCurrentUserSession?: Maybe<SessionType>;
  getCurrentUserSessions?: Maybe<Array<SessionType>>;
  getFilterById: FilterType;
  getGroupByID: GroupType;
  getIssueByID?: Maybe<IssueType>;
  getPermissionKeys: Array<PermissionKeyType>;
  getPermissionRulesByProjectID: Array<PermissionSchemeRuleType>;
  getPermissionRulesBySchemeID: Array<PermissionSchemeRuleType>;
  getProjecRoles: Array<ProjectRoleType>;
  getProjectByID: ProjectType;
  getProjectRoleMembers?: Maybe<Array<User>>;
  getRecentProjects: Array<ProjectType>;
  getRisk: RiskType;
  getStatusesByWorkflowID: Array<StatusType>;
  getTransitionByID: TransitionType;
  getUserByID?: Maybe<User>;
  getUserGroups: Array<GroupType>;
  getUserSessions?: Maybe<Array<SessionType>>;
  getUsersInGroup: Array<User>;
  getWorkflowByID: WorkflowType;
  getWorkflowByProjectID: WorkflowType;
};


export type QueryTestArgs = {
  TEST: FilterInput;
};


export type QueryFilterIssuesArgs = {
  Input: FilterInput;
};


export type QueryGetAllIssuesByProjectIdArgs = {
  Input: InputId;
};


export type QueryGetAllStatusesByProjectIdArgs = {
  Input: InputId;
};


export type QueryGetAllTransitionByStatusArgs = {
  StatusID?: InputMaybe<InputId>;
};


export type QueryGetAllTransitionsByWorkflowIdArgs = {
  InputID?: InputMaybe<InputId>;
};


export type QueryGetAllWorkflowsByProjectIdArgs = {
  Input: InputId;
};


export type QueryGetBoardByIdArgs = {
  BoardID: Scalars['Int']['input'];
};


export type QueryGetColumnsByBoardIdArgs = {
  ID: Scalars['Int']['input'];
};


export type QueryGetCondByIdArgs = {
  CondID: InputId;
};


export type QueryGetFilterByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetGroupByIdArgs = {
  GetGropByID: Scalars['Int']['input'];
};


export type QueryGetIssueByIdArgs = {
  Input: InputId;
};


export type QueryGetPermissionRulesByProjectIdArgs = {
  getPermissionRulesByProjectID: InputId;
};


export type QueryGetPermissionRulesBySchemeIdArgs = {
  InputID: InputId;
};


export type QueryGetProjectByIdArgs = {
  Input: InputId;
};


export type QueryGetProjectRoleMembersArgs = {
  getProjectRoleMembers: GetProjectRoleMemberInput;
};


export type QueryGetRiskArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetStatusesByWorkflowIdArgs = {
  getWorkflowStatuses: InputId;
};


export type QueryGetTransitionByIdArgs = {
  ID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserByIdArgs = {
  ID: Scalars['Int']['input'];
};


export type QueryGetUserGroupsArgs = {
  GetUserGroups: Scalars['Int']['input'];
};


export type QueryGetUserSessionsArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUsersInGroupArgs = {
  GetUsersInGroup: Scalars['Int']['input'];
};


export type QueryGetWorkflowByIdArgs = {
  Input: InputId;
};


export type QueryGetWorkflowByProjectIdArgs = {
  Input: InputId;
};

export type RegisterInput = {
  /** Адрес электронной почты пользователя */
  email: Scalars['String']['input'];
  /** Имя пользователя */
  name: Scalars['String']['input'];
  /** Пароль */
  password: Scalars['String']['input'];
  /** Отчество пользователя */
  patronymic: Scalars['String']['input'];
  /** Фамилия пользователя */
  surname: Scalars['String']['input'];
};

export enum RelatedEntityType {
  Comment = 'COMMENT',
  Issue = 'ISSUE',
  Project = 'PROJECT',
  System = 'SYSTEM',
  User = 'USER'
}

export type RiskType = {
  __typename?: 'RiskType';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  impact: Scalars['Int']['output'];
  mitigationPlan: Scalars['String']['output'];
  probability: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type SessionType = {
  __typename?: 'SessionType';
  createdAt: Scalars['Date']['output'];
  device: DeviceType;
  deviceId: Scalars['String']['output'];
  expireIn: Scalars['Int']['output'];
  session_uuid: Scalars['String']['output'];
  user: User;
};

export type SetNewPassForgot = {
  double_password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortType = {
  __typename?: 'SortType';
  field: Scalars['String']['output'];
  order: Scalars['String']['output'];
};

export type StatusMetaInput = {
  posX?: InputMaybe<Scalars['Float']['input']>;
  posY?: InputMaybe<Scalars['Float']['input']>;
  variant?: InputMaybe<StatusStyleVariant>;
};

export type StatusMetaType = {
  __typename?: 'StatusMetaType';
  ID: Scalars['Int']['output'];
  posX: Scalars['Int']['output'];
  posY: Scalars['Int']['output'];
  variant: StatusStyleVariant;
};

export enum StatusStyleVariant {
  Default = 'DEFAULT',
  Primary = 'PRIMARY',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type StatusType = {
  __typename?: 'StatusType';
  /** Идентификатор статуса */
  ID: Scalars['Int']['output'];
  /** Доступ для перехода на этот статус */
  cond?: Maybe<CondType>;
  /** Конечный статус */
  is_finished: Scalars['Boolean']['output'];
  /** Начальный статус */
  is_initial: Scalars['Boolean']['output'];
  /** Cтатус в процессе */
  on_process: Scalars['Boolean']['output'];
  /** Идентификатор родительского бизнес-процесса */
  parent?: Maybe<WorkflowType>;
  /** Метаданные статуса */
  status_meta: StatusMetaType;
  /** Название статуса */
  title?: Maybe<Scalars['String']['output']>;
  /** Переходы статусов */
  transitions?: Maybe<Array<TransitionType>>;
};

export type TransitionMeta = {
  __typename?: 'TransitionMeta';
  ID: Scalars['Int']['output'];
  sourceHandle: HandleTypeId;
  targetHandle: HandleTypeId;
};

export type TransitionMetaInput = {
  sourceHandle: HandleTypeId;
  targetHandle: HandleTypeId;
};

export type TransitionPermissionSchemeRuleInput = {
  /** Идентификатор перехода */
  ID: Scalars['Int']['input'];
  group?: InputMaybe<Array<InputId>>;
  is_Assegnee?: InputMaybe<Scalars['Boolean']['input']>;
  is_Owner?: InputMaybe<Scalars['Boolean']['input']>;
  is_Project_Lead?: InputMaybe<Scalars['Boolean']['input']>;
  projectRole?: InputMaybe<Array<InputId>>;
  user?: InputMaybe<Array<InputId>>;
};

export type TransitionType = {
  __typename?: 'TransitionType';
  ID?: Maybe<Scalars['Int']['output']>;
  parent?: Maybe<StatusType>;
  permission?: Maybe<PermissionSchemeRuleType>;
  title?: Maybe<Scalars['String']['output']>;
  to?: Maybe<StatusType>;
  transition_meta: TransitionMeta;
};

export type UpdateColumnInput = {
  ID: Scalars['Int']['input'];
  column_name?: InputMaybe<Scalars['String']['input']>;
  column_position?: InputMaybe<Scalars['Int']['input']>;
  statuses?: InputMaybe<Array<InputId>>;
};

export type UpdateGroupInput = {
  /** Идентификатор группы */
  ID: Scalars['Int']['input'];
  /** Описание группы */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Имя группы */
  group_name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIssueInput = {
  /** Идентификатор запроса */
  ID: Scalars['Int']['input'];
  assignee?: InputMaybe<InputId>;
  author?: InputMaybe<InputId>;
  components?: InputMaybe<Array<InputId>>;
  description?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['DateTime']['input']>;
  issueType?: InputMaybe<InputId>;
  /** Родительская задача */
  parentIssue?: InputMaybe<InputId>;
  project?: InputMaybe<InputId>;
  /** Текущее состояние запроса */
  status?: InputMaybe<InputId>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyProfile = {
  ID: Scalars['Int']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermissionSchemeRuleInput = {
  ID: Scalars['Int']['input'];
  group?: InputMaybe<Array<InputId>>;
  is_Assegnee?: InputMaybe<Scalars['Boolean']['input']>;
  is_Owner?: InputMaybe<Scalars['Boolean']['input']>;
  is_Project_Lead?: InputMaybe<Scalars['Boolean']['input']>;
  projectRole?: InputMaybe<Array<InputId>>;
  user?: InputMaybe<Array<InputId>>;
};

export type UpdateProjectComponentInput = {
  ID: Scalars['Int']['input'];
  defaultExecuter?: InputMaybe<InputId>;
  description?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<InputId>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  ID: Scalars['Int']['input'];
  /** Описание проекта */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Изображение проекта */
  image?: InputMaybe<Scalars['Upload']['input']>;
  /** Ключ проекта */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Руководитель проекта */
  lead?: InputMaybe<Scalars['Int']['input']>;
  /** Имя проекта */
  project_name?: InputMaybe<Scalars['String']['input']>;
  workflow?: InputMaybe<InputId>;
};

export type UpdateRiskDto = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  impact?: InputMaybe<Scalars['Float']['input']>;
  mitigationPlan?: InputMaybe<Scalars['String']['input']>;
  probability?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  /** Идентификатор обновляемого пользователя пользователя (сам ID изменить нельзя) */
  ID: Scalars['Int']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isActivated?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowInput = {
  ID: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Идернификатор пользователя */
  ID: Scalars['Int']['output'];
  /** Аватар пользователя */
  avatar?: Maybe<FileEntity>;
  /** Подразделение */
  department?: Maybe<Scalars['String']['output']>;
  /** Адрес электронной почты пользователя */
  email?: Maybe<Scalars['String']['output']>;
  /** Пользовательский статус */
  isActivated?: Maybe<Scalars['Boolean']['output']>;
  /** Имя пользователя */
  name?: Maybe<Scalars['String']['output']>;
  /** Отчество пользователя */
  patronymic?: Maybe<Scalars['String']['output']>;
  /** Дата регистрации пользователя */
  register_date: Scalars['Date']['output'];
  /** Фамилия пользователя */
  surname?: Maybe<Scalars['String']['output']>;
  /** Дата последнего обновления пользователя */
  updated_date?: Maybe<Scalars['Date']['output']>;
};

export type WorkflowType = {
  __typename?: 'WorkflowType';
  /** ID бизнес-процесса */
  ID: Scalars['Int']['output'];
  /** Дата создания бизнес процесса */
  create_date: Scalars['DateTime']['output'];
  /** Описание бизнес-процесса */
  description?: Maybe<Scalars['String']['output']>;
  issueType: Array<IssueTypeEntity>;
  /** Массив статусов бизнес-процесса */
  statuses?: Maybe<Array<StatusType>>;
  /** Название бизнес-процесса */
  title: Scalars['String']['output'];
  /** Дата обновления бизнес процесса */
  update_date: Scalars['DateTime']['output'];
};

export enum Board_Type {
  Kanban = 'kanban',
  Sprint = 'sprint'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  patronymic: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: string };

export type ConfirmMutationVariables = Exact<{
  email: Scalars['String']['input'];
  activationToken: Scalars['String']['input'];
}>;


export type ConfirmMutation = { __typename?: 'Mutation', confirm?: string | null };

export type ForgotMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotMutation = { __typename?: 'Mutation', forgot?: string | null };

export type UpdatePassMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  double_password: Scalars['String']['input'];
}>;


export type UpdatePassMutation = { __typename?: 'Mutation', updatePass?: string | null };

export type ChangePasswordMutationVariables = Exact<{
  ID: Scalars['Int']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  repeatNewPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', ID: number } };

export type GetUserSessionsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserSessionsQuery = { __typename?: 'Query', getUserSessions?: Array<{ __typename?: 'SessionType', session_uuid: string, deviceId: string, expireIn: number, device: { __typename?: 'DeviceType', userAgent: string, ip: string } }> | null };

export type GetCurrentUserSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserSessionsQuery = { __typename?: 'Query', getCurrentUserSessions?: Array<{ __typename?: 'SessionType', deviceId: string, session_uuid: string, expireIn: number, createdAt: any, device: { __typename?: 'DeviceType', userAgent: string, ip: string } }> | null, getCurrentUserSession?: { __typename?: 'SessionType', deviceId: string, session_uuid: string, expireIn: number, createdAt: any, device: { __typename?: 'DeviceType', userAgent: string, ip: string } } | null };

export type Kill_SessionMutationVariables = Exact<{
  session_uuid: Scalars['String']['input'];
}>;


export type Kill_SessionMutation = { __typename?: 'Mutation', kill_session: boolean };

export type FogotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type FogotPasswordMutation = { __typename?: 'Mutation', forgot?: string | null };

export type Kill_All_SessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type Kill_All_SessionsMutation = { __typename?: 'Mutation', kill_all_sessions: boolean };

export type CreateGroupMutationVariables = Exact<{
  group_name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GroupType', ID: number, group_name: string, create_date: any, updated_date?: any | null, description?: string | null } };

export type UpdateGroupMutationVariables = Exact<{
  ID: Scalars['Int']['input'];
  group_name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'GroupType', ID: number, group_name: string, create_date: any, updated_date?: any | null, description?: string | null } };

export type RemoveGroupMutationVariables = Exact<{
  RemoveGroup: Scalars['Int']['input'];
}>;


export type RemoveGroupMutation = { __typename?: 'Mutation', removeGroup: boolean };

export type GetPermissionRulesByProjectIdQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type GetPermissionRulesByProjectIdQuery = { __typename?: 'Query', getPermissionRulesByProjectID: Array<{ __typename?: 'PermissionSchemeRuleType', ID: number, is_Project_Lead?: boolean | null, is_Assegnee?: boolean | null, is_Owner?: boolean | null, permissionKey: { __typename?: 'PermissionKeyType', ID: number, permissionKey: string, description: string }, projectRole?: Array<{ __typename?: 'ProjectRoleType', ID: number, name: string, description?: string | null, members?: Array<{ __typename?: 'ProjectRoleMemberType', ID: number, role: { __typename?: 'ProjectRoleType', ID: number, name: string, description?: string | null, members?: Array<{ __typename?: 'ProjectRoleMemberType', ID: number, members?: Array<{ __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null }> | null }> | null } }> | null }> | null, group?: Array<{ __typename?: 'GroupType', ID: number, group_name: string }> | null, user?: Array<{ __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null }> | null }> };

export type GetPermissionKeysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPermissionKeysQuery = { __typename?: 'Query', getPermissionKeys: Array<{ __typename?: 'PermissionKeyType', ID: number, permissionName: string, permissionKey: string, description: string }> };

export type GetAvailableProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableProjectsQuery = { __typename?: 'Query', getAvailableProjects: Array<{ __typename?: 'ProjectType', ID: number, project_name: string, description?: string | null, key: string, image?: { __typename?: 'FileEntity', ID: number, originalName?: string | null, url: string } | null, lead?: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } | null }> };

export type GetRecentProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentProjectsQuery = { __typename?: 'Query', getRecentProjects: Array<{ __typename?: 'ProjectType', ID: number, project_name: string, description?: string | null, key: string, image?: { __typename?: 'FileEntity', ID: number, originalName?: string | null, url: string } | null, lead?: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } | null }> };

export type DeleteProjectMutationVariables = Exact<{
  Input: InputId;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: boolean | null };

export type GetAllIssuesByProjectIdQueryVariables = Exact<{
  Input: InputId;
}>;


export type GetAllIssuesByProjectIdQuery = { __typename?: 'Query', getAllIssuesByProjectID?: Array<{ __typename?: 'IssueType', ID?: number | null, key?: string | null, issueNum: number, title?: string | null, description?: string | null, priority?: string | null, create_date: any, update_date?: any | null, due_date?: any | null, issueType?: { __typename?: 'IssueTypeEntity', ID: number, name: string, icon_url?: string | null } | null, author?: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null } | null, assignee?: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null } | null }> | null };

export type CreateProjectMutationVariables = Exact<{
  lead: Scalars['Int']['input'];
  project_name: Scalars['String']['input'];
  key: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectType', ID: number, project_name: string, description?: string | null, key: string, image?: { __typename?: 'FileEntity', ID: number, originalName?: string | null, url: string } | null } };

export type GetProjectByIdQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProjectByID: { __typename?: 'ProjectType', ID: number, project_name: string, description?: string | null, key: string, image?: { __typename?: 'FileEntity', ID: number, originalName?: string | null, url: string } | null, lead?: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } | null } };

export type GetUserByIdQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserByID?: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, originalName?: string | null, url: string } | null }> | null };

export type GetUserGroupsQueryVariables = Exact<{
  GetUserGroups: Scalars['Int']['input'];
}>;


export type GetUserGroupsQuery = { __typename?: 'Query', getUserGroups: Array<{ __typename?: 'GroupType', ID: number, group_name: string }> };

export type GetUsersInGroupQueryVariables = Exact<{
  GetUsersInGroup: Scalars['Int']['input'];
}>;


export type GetUsersInGroupQuery = { __typename?: 'Query', getUsersInGroup: Array<{ __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number } | null }> };

export type CreateUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
  patronymic: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number } | null } };

export type UpdateUserMutationVariables = Exact<{
  ID: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  isActivated?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', ID: number, email?: string | null, name?: string | null, surname?: string | null, patronymic?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number } | null } };

export type DeleteUserMutationVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type UpdateMyProfileMutationVariables = Exact<{
  ID: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateMyProfileMutation = { __typename?: 'Mutation', updateMyProfile: { __typename?: 'User', ID: number, name?: string | null, surname?: string | null, patronymic?: string | null, email?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, url: string, originalName?: string | null } | null } };

export type SetAvatarMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type SetAvatarMutation = { __typename?: 'Mutation', setAvatar: { __typename?: 'User', ID: number, name?: string | null, surname?: string | null, patronymic?: string | null, email?: string | null, department?: string | null, isActivated?: boolean | null, register_date: any, updated_date?: any | null, avatar?: { __typename?: 'FileEntity', ID: number, originalName?: string | null, url: string } | null } };

export type GetAllStatusesByWorkflowIdQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type GetAllStatusesByWorkflowIdQuery = { __typename?: 'Query', getStatusesByWorkflowID: Array<{ __typename?: 'StatusType', ID: number, title?: string | null, is_initial: boolean, is_finished: boolean, on_process: boolean, status_meta: { __typename?: 'StatusMetaType', ID: number, posX: number, posY: number, variant: StatusStyleVariant } }> };

export type UpdateStatusMutationVariables = Exact<{
  ID: Scalars['Int']['input'];
  parent: InputId;
  title?: InputMaybe<Scalars['String']['input']>;
  is_initial?: InputMaybe<Scalars['Boolean']['input']>;
  is_finished?: InputMaybe<Scalars['Boolean']['input']>;
  on_process?: InputMaybe<Scalars['Boolean']['input']>;
  status_meta?: InputMaybe<StatusMetaInput>;
}>;


export type UpdateStatusMutation = { __typename?: 'Mutation', updateStatus: { __typename?: 'StatusType', ID: number, title?: string | null, is_initial: boolean, is_finished: boolean, on_process: boolean } };

export type CreateStatusMutationVariables = Exact<{
  createStatusInput: CreateOrUpdateStatusInput;
}>;


export type CreateStatusMutation = { __typename?: 'Mutation', createStatus: Array<{ __typename?: 'StatusType', ID: number, title?: string | null, is_initial: boolean, is_finished: boolean, on_process: boolean }> };

export type DeleteStatusMutationVariables = Exact<{
  deleteStatusInput: InputId;
}>;


export type DeleteStatusMutation = { __typename?: 'Mutation', deleteStatus: boolean };

export type CreateTransitionMutationVariables = Exact<{
  createOrUpdateTransitionInput: PartialTransitionInput;
}>;


export type CreateTransitionMutation = { __typename?: 'Mutation', createTransition: { __typename?: 'TransitionType', ID?: number | null, title?: string | null } };

export type SetATransitionRuleMutationVariables = Exact<{
  TransitionPermissionSchemeRule: TransitionPermissionSchemeRuleInput;
}>;


export type SetATransitionRuleMutation = { __typename?: 'Mutation', setATransitionRule: { __typename?: 'TransitionType', ID?: number | null, title?: string | null } };

export type GetAllTransitionsByWorkflowIdQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type GetAllTransitionsByWorkflowIdQuery = { __typename?: 'Query', getAllTransitionsByWorkflowID: Array<{ __typename?: 'TransitionType', ID?: number | null, title?: string | null, to?: { __typename?: 'StatusType', ID: number } | null, parent?: { __typename?: 'StatusType', ID: number } | null, transition_meta: { __typename?: 'TransitionMeta', ID: number, sourceHandle: HandleTypeId, targetHandle: HandleTypeId } }> };

export type DeleteTransitionMutationVariables = Exact<{
  Transition: InputId;
}>;


export type DeleteTransitionMutation = { __typename?: 'Mutation', deleteTransition: boolean };

export type CreateWorkflowMutationVariables = Exact<{
  createWorkflowInput: CreateWorkflowInput;
}>;


export type CreateWorkflowMutation = { __typename?: 'Mutation', createWorkflow: { __typename?: 'WorkflowType', ID: number, title: string, description?: string | null, create_date: any, update_date: any } };

export type UpdateWorkflowMutationVariables = Exact<{
  updateWorkflowInput: UpdateWorkflowInput;
}>;


export type UpdateWorkflowMutation = { __typename?: 'Mutation', updateWorkflow: { __typename?: 'WorkflowType', ID: number, title: string, description?: string | null, create_date: any, update_date: any } };

export type DeleteWorkflowMutationVariables = Exact<{
  Input: InputId;
}>;


export type DeleteWorkflowMutation = { __typename?: 'Mutation', deleteWorkflow: boolean };

export type GetAllWorkflowsByProjectIdQueryVariables = Exact<{
  ID: Scalars['Int']['input'];
}>;


export type GetAllWorkflowsByProjectIdQuery = { __typename?: 'Query', getAllWorkflowsByProjectID: Array<{ __typename?: 'WorkflowType', ID: number, title: string, description?: string | null, update_date: any, issueType: Array<{ __typename?: 'IssueTypeEntity', ID: number, name: string, description?: string | null, icon_url?: string | null }> }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LoginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"RegisterInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"surname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patronymic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ConfirmDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Confirm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activationToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ConfirmToken"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"activationToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activationToken"}}}]}}]}]}}]} as unknown as DocumentNode<ConfirmMutation, ConfirmMutationVariables>;
export const ForgotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Forgot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ForgotPassInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}]}}]} as unknown as DocumentNode<ForgotMutation, ForgotMutationVariables>;
export const UpdatePassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"double_password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ForgotPass"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"double_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"double_password"}}}]}}]}]}}]} as unknown as DocumentNode<UpdatePassMutation, UpdatePassMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repeatNewPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"currentPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"repeatNewPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repeatNewPassword"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetUserSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserSessions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session_uuid"}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"ip"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"expireIn"}}]}}]}}]} as unknown as DocumentNode<GetUserSessionsQuery, GetUserSessionsQueryVariables>;
export const GetCurrentUserSessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUserSessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUserSessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"session_uuid"}},{"kind":"Field","name":{"kind":"Name","value":"expireIn"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"ip"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"getCurrentUserSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"session_uuid"}},{"kind":"Field","name":{"kind":"Name","value":"expireIn"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"device"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"ip"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserSessionsQuery, GetCurrentUserSessionsQueryVariables>;
export const Kill_SessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Kill_session"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"session_uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kill_session"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"session_uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"session_uuid"}}}]}]}}]} as unknown as DocumentNode<Kill_SessionMutation, Kill_SessionMutationVariables>;
export const FogotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FogotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ForgotPassInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}]}}]} as unknown as DocumentNode<FogotPasswordMutation, FogotPasswordMutationVariables>;
export const Kill_All_SessionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Kill_all_sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kill_all_sessions"}}]}}]} as unknown as DocumentNode<Kill_All_SessionsMutation, Kill_All_SessionsMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"group_name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"CreateGroupInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"group_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"group_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"group_name"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"group_name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"UpdateGroupInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"group_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"group_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"group_name"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const RemoveGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"RemoveGroup"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"RemoveGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"RemoveGroup"}}}]}]}}]} as unknown as DocumentNode<RemoveGroupMutation, RemoveGroupMutationVariables>;
export const GetPermissionRulesByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPermissionRulesByProjectID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPermissionRulesByProjectID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getPermissionRulesByProjectID"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"permissionKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"permissionKey"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_Project_Lead"}},{"kind":"Field","name":{"kind":"Name","value":"is_Assegnee"}},{"kind":"Field","name":{"kind":"Name","value":"is_Owner"}},{"kind":"Field","name":{"kind":"Name","value":"projectRole"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"group_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]}}]} as unknown as DocumentNode<GetPermissionRulesByProjectIdQuery, GetPermissionRulesByProjectIdQueryVariables>;
export const GetPermissionKeysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPermissionKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPermissionKeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"permissionName"}},{"kind":"Field","name":{"kind":"Name","value":"permissionKey"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetPermissionKeysQuery, GetPermissionKeysQueryVariables>;
export const GetAvailableProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAvailableProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAvailableProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"project_name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAvailableProjectsQuery, GetAvailableProjectsQueryVariables>;
export const GetRecentProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecentProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRecentProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"project_name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRecentProjectsQuery, GetRecentProjectsQueryVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Input"}}}]}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetAllIssuesByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllIssuesByProjectID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllIssuesByProjectID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"issueNum"}},{"kind":"Field","name":{"kind":"Name","value":"issueType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"icon_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"update_date"}},{"kind":"Field","name":{"kind":"Name","value":"due_date"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllIssuesByProjectIdQuery, GetAllIssuesByProjectIdQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lead"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project_name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lead"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lead"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"project_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"project_name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"project_name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"GetUserGroups"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"GetUserGroups"},"value":{"kind":"Variable","name":{"kind":"Name","value":"GetUserGroups"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"group_name"}}]}}]}}]} as unknown as DocumentNode<GetUserGroupsQuery, GetUserGroupsQueryVariables>;
export const GetUsersInGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersInGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"GetUsersInGroup"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsersInGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"GetUsersInGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"GetUsersInGroup"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]} as unknown as DocumentNode<GetUsersInGroupQuery, GetUsersInGroupQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"CreateUser"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patronymic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"surname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"department"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActivated"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"UpdateUser"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"surname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patronymic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"department"},"value":{"kind":"Variable","name":{"kind":"Name","value":"department"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isActivated"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActivated"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateMyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMyProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"department"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMyProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"UpdateMyProfile"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"surname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"patronymic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"patronymic"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"department"},"value":{"kind":"Variable","name":{"kind":"Name","value":"department"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]} as unknown as DocumentNode<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>;
export const SetAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetAvatar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setAvatar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"patronymic"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"isActivated"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"register_date"}},{"kind":"Field","name":{"kind":"Name","value":"updated_date"}}]}}]}}]} as unknown as DocumentNode<SetAvatarMutation, SetAvatarMutationVariables>;
export const GetAllStatusesByWorkflowIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllStatusesByWorkflowID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStatusesByWorkflowID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getWorkflowStatuses"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"is_initial"}},{"kind":"Field","name":{"kind":"Name","value":"is_finished"}},{"kind":"Field","name":{"kind":"Name","value":"on_process"}},{"kind":"Field","name":{"kind":"Name","value":"status_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"posX"}},{"kind":"Field","name":{"kind":"Name","value":"posY"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllStatusesByWorkflowIdQuery, GetAllStatusesByWorkflowIdQueryVariables>;
export const UpdateStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"is_initial"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"is_finished"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"on_process"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status_meta"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StatusMetaInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createStatusInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"is_initial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"is_initial"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"is_finished"},"value":{"kind":"Variable","name":{"kind":"Name","value":"is_finished"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"on_process"},"value":{"kind":"Variable","name":{"kind":"Name","value":"on_process"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"status_meta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status_meta"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"is_initial"}},{"kind":"Field","name":{"kind":"Name","value":"is_finished"}},{"kind":"Field","name":{"kind":"Name","value":"on_process"}}]}}]}}]} as unknown as DocumentNode<UpdateStatusMutation, UpdateStatusMutationVariables>;
export const CreateStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrUpdateStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createStatusInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"is_initial"}},{"kind":"Field","name":{"kind":"Name","value":"is_finished"}},{"kind":"Field","name":{"kind":"Name","value":"on_process"}}]}}]}}]} as unknown as DocumentNode<CreateStatusMutation, CreateStatusMutationVariables>;
export const DeleteStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteStatusInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deleteStatusInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteStatusInput"}}}]}]}}]} as unknown as DocumentNode<DeleteStatusMutation, DeleteStatusMutationVariables>;
export const CreateTransitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createOrUpdateTransitionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PartialTransitionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrUpdateTransitionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createOrUpdateTransitionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateTransitionMutation, CreateTransitionMutationVariables>;
export const SetATransitionRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetATransitionRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"TransitionPermissionSchemeRule"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransitionPermissionSchemeRuleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setATransitionRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"TransitionPermissionSchemeRule"},"value":{"kind":"Variable","name":{"kind":"Name","value":"TransitionPermissionSchemeRule"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<SetATransitionRuleMutation, SetATransitionRuleMutationVariables>;
export const GetAllTransitionsByWorkflowIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTransitionsByWorkflowID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTransitionsByWorkflowID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"InputID"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transition_meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"sourceHandle"}},{"kind":"Field","name":{"kind":"Name","value":"targetHandle"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllTransitionsByWorkflowIdQuery, GetAllTransitionsByWorkflowIdQueryVariables>;
export const DeleteTransitionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTransition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Transition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Transition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Transition"}}}]}]}}]} as unknown as DocumentNode<DeleteTransitionMutation, DeleteTransitionMutationVariables>;
export const CreateWorkflowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkflow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createWorkflowInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWorkflowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkflow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createWorkflowInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createWorkflowInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"update_date"}}]}}]}}]} as unknown as DocumentNode<CreateWorkflowMutation, CreateWorkflowMutationVariables>;
export const UpdateWorkflowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkflow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateWorkflowInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWorkflowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkflow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateWorkflowInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateWorkflowInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"create_date"}},{"kind":"Field","name":{"kind":"Name","value":"update_date"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkflowMutation, UpdateWorkflowMutationVariables>;
export const DeleteWorkflowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkflow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkflow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Input"}}}]}]}}]} as unknown as DocumentNode<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>;
export const GetAllWorkflowsByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllWorkflowsByProjectID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllWorkflowsByProjectID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"Input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"update_date"}},{"kind":"Field","name":{"kind":"Name","value":"issueType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ID"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"icon_url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllWorkflowsByProjectIdQuery, GetAllWorkflowsByProjectIdQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AddMemberInRoleInput = {
  members: Array<InputId>;
  project: InputId;
  role: InputId;
};

export type BoardType = {
  __typename?: 'BoardType';
  ID: Scalars['Int']['output'];
  Owner?: Maybe<User>;
  board_name: Scalars['String']['output'];
  board_type?: Maybe<Board_Type>;
  columns?: Maybe<Array<ColumnBoardType>>;
  create_date?: Maybe<Scalars['DateTime']['output']>;
  filter?: Maybe<FilterType>;
  update_date?: Maybe<Scalars['DateTime']['output']>;
};

export type BoardUpdateInput = {
  ID: Scalars['Int']['input'];
  Owner: InputId;
  board_name: Scalars['String']['input'];
  columns?: InputMaybe<Array<InputId>>;
  filter?: InputMaybe<InputId>;
};

export type ChangePasswordInput = {
  ID: Scalars['Int']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  repeatNewPassword: Scalars['String']['input'];
};

export type ColumnBoardType = {
  __typename?: 'ColumnBoardType';
  ID?: Maybe<Scalars['Int']['output']>;
  board: BoardType;
  column_name?: Maybe<Scalars['String']['output']>;
  column_position: Scalars['Int']['output'];
  statuses?: Maybe<Array<StatusType>>;
};

export type CondInput = {
  /** Флаг исполнителя задачи */
  asignee?: InputMaybe<Scalars['Boolean']['input']>;
  /** Флаг авторa задачи */
  author?: InputMaybe<Scalars['Boolean']['input']>;
  /** Группы пользователей */
  groups?: InputMaybe<Array<InputId>>;
  /** Список выбранных пользователей */
  users?: InputMaybe<Array<InputUser>>;
};

export type CondType = {
  __typename?: 'CondType';
  /** Идентификатор правила перехода на статус */
  ID: Scalars['Int']['output'];
  /** Исполнитель задачи */
  asignee?: Maybe<Scalars['Boolean']['output']>;
  /** Автор задачи */
  author?: Maybe<Scalars['Boolean']['output']>;
  /** Группы пользователей */
  groups?: Maybe<Array<GroupType>>;
  /** Идентификатор родительского статуса */
  parent?: Maybe<StatusType>;
  /** Список выбранных пользователей */
  users?: Maybe<Array<User>>;
};

export type ConditionGroup = {
  conditions: Array<ConditionItem>;
  logicalOperator: LogicalOperator;
};

export type ConditionItem = {
  field: FieldType;
  functionCall?: InputMaybe<FunctionCall>;
  operator: Operator;
  valueArrayNumber?: InputMaybe<Array<Scalars['Int']['input']>>;
  valueInputID?: InputMaybe<InputId>;
  valueInputIDArray?: InputMaybe<Array<InputId>>;
  valueNumber?: InputMaybe<Scalars['Int']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type ConditionType = {
  __typename?: 'ConditionType';
  field?: Maybe<Scalars['String']['output']>;
  operator?: Maybe<Operator>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ConfirmInput = {
  activationToken: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CreateColumnInput = {
  board: InputId;
  column_name?: InputMaybe<Scalars['String']['input']>;
  column_position?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateGroupInput = {
  /** Описание группы */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Название группы */
  group_name: Scalars['String']['input'];
};

export type CreateIssueInput = {
  assignee?: InputMaybe<InputId>;
  author: InputId;
  components?: InputMaybe<Array<InputId>>;
  description?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['DateTime']['input']>;
  issueType: InputId;
  parentIssue?: InputMaybe<InputId>;
  project: InputId;
  title: Scalars['String']['input'];
};

export type CreateIssueLinkInput = {
  linkType: LinkType;
  sourceIssueId: Scalars['Int']['input'];
  targetIssueId: Scalars['Int']['input'];
};

export type CreateOrUpdateCondInput = {
  ID?: InputMaybe<Scalars['Int']['input']>;
  /** Флаг исполнителя задачи */
  asignee?: InputMaybe<Scalars['Boolean']['input']>;
  /** Флаг авторa задачи */
  author?: InputMaybe<Scalars['Boolean']['input']>;
  /** Группы пользователей */
  groups?: InputMaybe<Array<InputId>>;
  /** Список выбранных пользователей */
  users?: InputMaybe<Array<InputUser>>;
};

export type CreateOrUpdateStatusInput = {
  /** Идентификатор статуса */
  ID?: InputMaybe<Scalars['Int']['input']>;
  /** Доступ для перехода на этот статус */
  cond?: InputMaybe<CondInput>;
  /** Конечный статус */
  is_finished?: InputMaybe<Scalars['Boolean']['input']>;
  /** Начальный статус */
  is_initial?: InputMaybe<Scalars['Boolean']['input']>;
  /** Cтатус в процессе */
  on_process?: InputMaybe<Scalars['Boolean']['input']>;
  /** Идентификатор родительского бизнес-процесса */
  parent: InputId;
  status_meta?: InputMaybe<StatusMetaInput>;
  /** Название статуса */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePermissionSchemeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateProjectComponentInput = {
  defaultExecuter?: InputMaybe<InputId>;
  description?: InputMaybe<Scalars['String']['input']>;
  issues?: InputMaybe<Array<InputId>>;
  owner?: InputMaybe<InputId>;
  parent: InputId;
  title: Scalars['String']['input'];
};

export type CreateProjectInput = {
  /** Описание проекта */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Изображение проекта */
  image?: InputMaybe<Scalars['Upload']['input']>;
  /** Ключ проекта */
  key: Scalars['String']['input'];
  /** Руководитель проекта */
  lead: Scalars['Int']['input'];
  /** Имя проекта */
  project_name: Scalars['String']['input'];
};

export type CreateProjectRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateRiskInput = {
  /** ID проекта */
  Project: InputId;
  /** Категория риска */
  category: Scalars['String']['input'];
  /** Описание риска */
  description: Scalars['String']['input'];
  /** Влияние/Воздействие риска на проект от 1 до 5 */
  impact: Scalars['Float']['input'];
  /** План действий для уменьшения возникновения этого риска */
  mitigationPlan: Scalars['String']['input'];
  /** Вероятность риска от 0 до 1 */
  probability: Scalars['Float']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  patronymic: Scalars['String']['input'];
  surname: Scalars['String']['input'];
};

export type CreateWorkflowInput = {
  /** Описание бизнес-процесса */
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type DeviceType = {
  __typename?: 'DeviceType';
  ip: Scalars['String']['output'];
  userAgent: Scalars['String']['output'];
};

export enum FieldType {
  Assignee = 'ASSIGNEE',
  Author = 'AUTHOR',
  ChildrenIssues = 'CHILDREN_ISSUES',
  Components = 'COMPONENTS',
  Description = 'DESCRIPTION',
  FixVersion = 'FIX_VERSION',
  Id = 'ID',
  IssueNum = 'ISSUE_NUM',
  IssueType = 'ISSUE_TYPE',
  Key = 'KEY',
  ParentIssue = 'PARENT_ISSUE',
  Priority = 'PRIORITY',
  Project = 'PROJECT',
  Title = 'TITLE'
}

export type FileEntity = {
  __typename?: 'FileEntity';
  ID: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  mimetype?: Maybe<MimeType>;
  originalName?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  relatedEntityId?: Maybe<Scalars['Int']['output']>;
  relatedEntityType?: Maybe<RelatedEntityType>;
  size?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uploadedBy?: Maybe<User>;
  url: Scalars['String']['output'];
};

export enum FileType {
  CommentAttachment = 'COMMENT_ATTACHMENT',
  IssueAttachment = 'ISSUE_ATTACHMENT',
  ProjectImage = 'PROJECT_IMAGE',
  SystemImage = 'SYSTEM_IMAGE',
  UserAvatar = 'USER_AVATAR',
  UserPhoto = 'USER_PHOTO'
}

export type FilterInput = {
  board?: InputMaybe<InputId>;
  conditions: Array<ConditionGroup>;
  logicalOperator: LogicalOperator;
  orderBy?: InputMaybe<OrderByInput>;
  owner: InputId;
  title: Scalars['String']['input'];
};

export type FilterType = {
  __typename?: 'FilterType';
  ID: Scalars['Int']['output'];
  conditions: Array<ConditionType>;
  logicalOperator?: Maybe<Scalars['String']['output']>;
  owner: User;
  sort?: Maybe<Array<SortType>>;
  title: Scalars['String']['output'];
};

export type ForgotPassInput = {
  /** Адрес электронной почты пользователя */
  email: Scalars['String']['input'];
};

export enum FunctionCall {
  ClosedSprints = 'CLOSED_SPRINTS',
  CurrentUser = 'CURRENT_USER',
  MembersOf = 'MEMBERS_OF',
  Now = 'NOW',
  ReleasedVersions = 'RELEASED_VERSIONS',
  UnreleasedVersion = 'UNRELEASED_VERSION',
  UpdatedBy = 'UPDATED_BY'
}

export type GetProjectRoleMemberInput = {
  project: InputId;
  role: InputId;
};

export type GroupMemberInput = {
  groupID: Scalars['Int']['input'];
  userID: Scalars['Int']['input'];
};

export type GroupType = {
  __typename?: 'GroupType';
  /** Идентификатор группы */
  ID: Scalars['Int']['output'];
  /** Дата и время создания группы */
  create_date: Scalars['DateTime']['output'];
  /** Описание группы */
  description?: Maybe<Scalars['String']['output']>;
  /** Название группы */
  group_name: Scalars['String']['output'];
  /** Дата и время последнего обновления группы */
  updated_date?: Maybe<Scalars['DateTime']['output']>;
};

export enum HandleTypeId {
  Sb = 'SB',
  Sr = 'SR',
  St = 'ST',
  Tb = 'TB',
  Tl = 'TL',
  Tt = 'TT'
}

export type InputId = {
  ID: Scalars['Int']['input'];
};

export type InputUser = {
  /** Идентификатор пользователя */
  ID?: InputMaybe<Scalars['Int']['input']>;
  /** Адрес электронной почты пользователя */
  email?: InputMaybe<Scalars['String']['input']>;
};

export type IssueLinkType = {
  __typename?: 'IssueLinkType';
  ID: Scalars['Int']['output'];
  link_type: LinkType;
  source_issue: IssueType;
  target_issue: IssueType;
};

export type IssueType = {
  __typename?: 'IssueType';
  /** Идентификатор запроса */
  ID?: Maybe<Scalars['Int']['output']>;
  /** Исполнитель для работы над запросом */
  assignee?: Maybe<User>;
  /** Пользователь, который внес запрос в систему */
  author?: Maybe<User>;
  /** Дочерние запросы */
  childrenIssues?: Maybe<Array<IssueType>>;
  /** Компоненты в рамках проекта, которые связанны с данным запросом */
  components?: Maybe<Array<ProjectComponentType>>;
  /** Дата и время создания запроса */
  create_date: Scalars['DateTime']['output'];
  /** Описание запроса */
  description?: Maybe<Scalars['String']['output']>;
  /** Срок исполнения запроса */
  due_date?: Maybe<Scalars['DateTime']['output']>;
  /** Номер запроса */
  issueNum: Scalars['Int']['output'];
  /** Тип запроса */
  issueType?: Maybe<IssueTypeEntity>;
  /** Ключ запроса */
  key?: Maybe<Scalars['String']['output']>;
  /** Родительская запрос */
  parentIssue?: Maybe<IssueType>;
  /** Приоритет запроса */
  priority?: Maybe<Scalars['String']['output']>;
  /** Проект, к которому принадлежит запрос */
  project?: Maybe<ProjectType>;
  /** Текущее состояние запроса */
  status: StatusType;
  /** Сводка */
  title?: Maybe<Scalars['String']['output']>;
  /** Дата и время последнего обновления запроса */
  update_date?: Maybe<Scalars['DateTime']['output']>;
};

export type IssueTypeEntity = {
  __typename?: 'IssueTypeEntity';
  ID: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  project?: Maybe<ProjectType>;
  workflow?: Maybe<WorkflowType>;
};

export enum LinkType {
  Ff = 'FF',
  Fs = 'FS',
  Sf = 'SF',
  Ss = 'SS'
}

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum MimeType {
  Jpeg = 'JPEG',
  Mp4 = 'MP4',
  Pdf = 'PDF',
  Png = 'PNG',
  Svg = 'SVG',
  Webp = 'WEBP',
  Zip = 'ZIP'
}

export type Mutation = {
  __typename?: 'Mutation';
  CreatePermissionScheme?: Maybe<PermissionSchemeType>;
  DeletePermissionScheme?: Maybe<Scalars['Boolean']['output']>;
  UpdatePermissionScheme?: Maybe<Scalars['Boolean']['output']>;
  addMemberInProjectRole: ProjectRoleMemberType;
  addUserInGroup: Array<User>;
  changePassword: User;
  confirm?: Maybe<Scalars['String']['output']>;
  createColumn: ColumnBoardType;
  createFilter: FilterType;
  createGroup: GroupType;
  createIssue: IssueType;
  createIssueLink: IssueLinkType;
  createOrUpdateCond: CondType;
  createProject: ProjectType;
  createProjectComponent: ProjectComponentType;
  createProjectRole: ProjectRoleType;
  createRisk: RiskType;
  createStatus: Array<StatusType>;
  createTransition: TransitionType;
  createUser: User;
  createWorkflow: WorkflowType;
  deleteBoard: Scalars['Boolean']['output'];
  deleteComponent: Array<Scalars['String']['output']>;
  deleteCond: Array<Scalars['String']['output']>;
  deleteFile: Scalars['Boolean']['output'];
  deleteFilter: Scalars['Boolean']['output'];
  deleteIssue: Scalars['Boolean']['output'];
  deleteProject?: Maybe<Scalars['Boolean']['output']>;
  deleteProjectRole: Scalars['Boolean']['output'];
  deleteStatus: Scalars['Boolean']['output'];
  deleteTransition: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteWorkflow: Scalars['Boolean']['output'];
  forgot?: Maybe<Scalars['String']['output']>;
  getIssueTypeByID: IssueTypeEntity;
  kill_all_sessions: Scalars['Boolean']['output'];
  kill_session: Scalars['Boolean']['output'];
  login: User;
  logout?: Maybe<Scalars['Boolean']['output']>;
  register: Scalars['String']['output'];
  removeGroup: Scalars['Boolean']['output'];
  removeRisk: Scalars['Boolean']['output'];
  removeUserFromGroup: Array<User>;
  setATransitionRule: TransitionType;
  setAvatar: User;
  updateBoard: BoardType;
  updateColumn: ColumnBoardType;
  updateComponent: ProjectComponentType;
  updateGroup: GroupType;
  updateIssue: IssueType;
  updateMyProfile: User;
  updatePass?: Maybe<Scalars['String']['output']>;
  updatePermissionRule: PermissionSchemeRuleType;
  updateProject: ProjectType;
  updateProjectRole: ProjectRoleType;
  updateRisk: RiskType;
  updateStatus: StatusType;
  updateUser: User;
  updateWorkflow: WorkflowType;
  uploadFile: FileEntity;
};


export type MutationCreatePermissionSchemeArgs = {
  Input: CreatePermissionSchemeInput;
};


export type MutationDeletePermissionSchemeArgs = {
  Input: InputId;
};


export type MutationUpdatePermissionSchemeArgs = {
  Input: InputId;
};


export type MutationAddMemberInProjectRoleArgs = {
  addMemberInProjectRole: AddMemberInRoleInput;
};


export type MutationAddUserInGroupArgs = {
  AddUserInGroup: GroupMemberInput;
};


export type MutationChangePasswordArgs = {
  Input: ChangePasswordInput;
};


export type MutationConfirmArgs = {
  ConfirmToken: ConfirmInput;
};


export type MutationCreateColumnArgs = {
  ColumnInput: CreateColumnInput;
};


export type MutationCreateFilterArgs = {
  input: FilterInput;
};


export type MutationCreateGroupArgs = {
  CreateGroupInput: CreateGroupInput;
};


export type MutationCreateIssueArgs = {
  Input: CreateIssueInput;
};


export type MutationCreateIssueLinkArgs = {
  Input: CreateIssueLinkInput;
};


export type MutationCreateOrUpdateCondArgs = {
  createOrUpdateCondInput: CreateOrUpdateCondInput;
};


export type MutationCreateProjectArgs = {
  Input: CreateProjectInput;
};


export type MutationCreateProjectComponentArgs = {
  Input: CreateProjectComponentInput;
};


export type MutationCreateProjectRoleArgs = {
  createProjectRole: CreateProjectRoleInput;
};


export type MutationCreateRiskArgs = {
  createRiskDto: CreateRiskInput;
};


export type MutationCreateStatusArgs = {
  createStatusInput: CreateOrUpdateStatusInput;
};


export type MutationCreateTransitionArgs = {
  createOrUpdateTransitionInput: PartialTransitionInput;
};


export type MutationCreateUserArgs = {
  CreateUser: CreateUserInput;
};


export type MutationCreateWorkflowArgs = {
  createWorkflowInput: CreateWorkflowInput;
};


export type MutationDeleteBoardArgs = {
  Delete: InputId;
};


export type MutationDeleteComponentArgs = {
  inputID: InputId;
};


export type MutationDeleteCondArgs = {
  deleteCondInput: InputId;
};


export type MutationDeleteFileArgs = {
  fileId: Scalars['Int']['input'];
};


export type MutationDeleteFilterArgs = {
  input: InputId;
};


export type MutationDeleteIssueArgs = {
  Input: InputId;
};


export type MutationDeleteProjectArgs = {
  Input: InputId;
};


export type MutationDeleteProjectRoleArgs = {
  id: InputId;
};


export type MutationDeleteStatusArgs = {
  deleteStatusInput: InputId;
};


export type MutationDeleteTransitionArgs = {
  Transition: InputId;
};


export type MutationDeleteUserArgs = {
  ID: Scalars['Int']['input'];
};


export type MutationDeleteWorkflowArgs = {
  Input: InputId;
};


export type MutationForgotArgs = {
  ForgotPassInput: ForgotPassInput;
};


export type MutationGetIssueTypeByIdArgs = {
  createIssueTypeInput: Scalars['Int']['input'];
};


export type MutationKill_SessionArgs = {
  session_uuid: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  LoginInput: LoginInput;
};


export type MutationRegisterArgs = {
  RegisterInput: RegisterInput;
};


export type MutationRemoveGroupArgs = {
  RemoveGroup: Scalars['Int']['input'];
};


export type MutationRemoveRiskArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveUserFromGroupArgs = {
  removeUserFromGroup: GroupMemberInput;
};


export type MutationSetATransitionRuleArgs = {
  TransitionPermissionSchemeRule: TransitionPermissionSchemeRuleInput;
};


export type MutationSetAvatarArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationUpdateBoardArgs = {
  BoardUpdateInput: BoardUpdateInput;
};


export type MutationUpdateColumnArgs = {
  ColumnUpdateInput: UpdateColumnInput;
};


export type MutationUpdateComponentArgs = {
  updateProjectComponentInput: UpdateProjectComponentInput;
};


export type MutationUpdateGroupArgs = {
  UpdateGroupInput: UpdateGroupInput;
};


export type MutationUpdateIssueArgs = {
  Input: UpdateIssueInput;
};


export type MutationUpdateMyProfileArgs = {
  UpdateMyProfile: UpdateMyProfile;
};


export type MutationUpdatePassArgs = {
  ForgotPass: SetNewPassForgot;
};


export type MutationUpdatePermissionRuleArgs = {
  Input: UpdatePermissionSchemeRuleInput;
};


export type MutationUpdateProjectArgs = {
  Input: UpdateProjectInput;
};


export type MutationUpdateProjectRoleArgs = {
  updateProjectRole: ProjectRoleInput;
};


export type MutationUpdateRiskArgs = {
  id: Scalars['Float']['input'];
  updateRiskDto: UpdateRiskDto;
};


export type MutationUpdateStatusArgs = {
  createStatusInput: CreateOrUpdateStatusInput;
};


export type MutationUpdateUserArgs = {
  UpdateUser: UpdateUserInput;
};


export type MutationUpdateWorkflowArgs = {
  updateWorkflowInput: UpdateWorkflowInput;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  relatedEntityId?: InputMaybe<Scalars['Int']['input']>;
  relatedEntityType?: InputMaybe<RelatedEntityType>;
  type: FileType;
};

export enum Operator {
  Equals = 'EQUALS',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  In = 'IN',
  IsNotNull = 'IS_NOT_NULL',
  IsNull = 'IS_NULL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  Like = 'LIKE',
  NotEquals = 'NOT_EQUALS',
  NotIn = 'NOT_IN'
}

export type OrderByInput = {
  field: FieldType;
  orderBy: SortOrder;
};

export type PartialTransitionInput = {
  ID?: InputMaybe<Scalars['Int']['input']>;
  parent?: InputMaybe<InputId>;
  title?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<InputId>;
  transition_meta?: InputMaybe<TransitionMetaInput>;
};

export type PermissionKeyType = {
  __typename?: 'PermissionKeyType';
  ID: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  permissionKey: Scalars['String']['output'];
  permissionName: Scalars['String']['output'];
  permissionSchemeRule: Array<PermissionSchemeRuleType>;
};

export type PermissionSchemeRuleType = {
  __typename?: 'PermissionSchemeRuleType';
  ID: Scalars['Int']['output'];
  group?: Maybe<Array<GroupType>>;
  is_Assegnee?: Maybe<Scalars['Boolean']['output']>;
  is_Owner?: Maybe<Scalars['Boolean']['output']>;
  is_Project_Lead?: Maybe<Scalars['Boolean']['output']>;
  permissionKey: PermissionKeyType;
  permissionScheme: PermissionSchemeType;
  projectRole?: Maybe<Array<ProjectRoleType>>;
  user?: Maybe<Array<User>>;
};

export type PermissionSchemeType = {
  __typename?: 'PermissionSchemeType';
  ID: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type ProjectComponentType = {
  __typename?: 'ProjectComponentType';
  ID: Scalars['Int']['output'];
  defaultExecuter?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  parent: ProjectType;
  title: Scalars['String']['output'];
};

export type ProjectRoleInput = {
  ID: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ProjectRoleMemberType = {
  __typename?: 'ProjectRoleMemberType';
  ID: Scalars['Int']['output'];
  members?: Maybe<Array<User>>;
  project: ProjectType;
  role: ProjectRoleType;
};

export type ProjectRoleType = {
  __typename?: 'ProjectRoleType';
  ID: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<ProjectRoleMemberType>>;
  name: Scalars['String']['output'];
};

export type ProjectType = {
  __typename?: 'ProjectType';
  /** id проекта */
  ID: Scalars['Int']['output'];
  /** Компоненты проекта */
  components?: Maybe<Array<ProjectComponentType>>;
  /** Описание проекта */
  description?: Maybe<Scalars['String']['output']>;
  /** Изображение проекта */
  image?: Maybe<FileEntity>;
  /** Типы задач проета */
  issue_types?: Maybe<IssueTypeEntity>;
  /** Задачи проекта */
  issues?: Maybe<Array<IssueType>>;
  /** Ключ проекта */
  key: Scalars['String']['output'];
  /** Руководитель проекта */
  lead?: Maybe<User>;
  permissionScheme?: Maybe<PermissionSchemeType>;
  /** Имя проекта */
  project_name: Scalars['String']['output'];
  /** Риски проекта */
  risk?: Maybe<Array<RiskType>>;
};

export type Query = {
  __typename?: 'Query';
  TEST: Scalars['Int']['output'];
  filterIssues?: Maybe<Array<IssueType>>;
  getAllBoard: Array<BoardType>;
  getAllConds: Array<CondType>;
  getAllFilters: Array<FilterType>;
  getAllGroups: Array<GroupType>;
  getAllIssueLink: Array<IssueLinkType>;
  getAllIssuesByProjectID?: Maybe<Array<IssueType>>;
  getAllProjects: Array<ProjectType>;
  getAllRisks: Array<RiskType>;
  getAllStatusesByProjectID: Array<StatusType>;
  getAllTransitionByStatus: Array<TransitionType>;
  getAllTransitionsByWorkflowID: Array<TransitionType>;
  getAllUsers?: Maybe<Array<User>>;
  getAllWorkflows: Array<WorkflowType>;
  getAllWorkflowsByProjectID: Array<WorkflowType>;
  getAvailableProjects: Array<ProjectType>;
  getBoardByID: BoardType;
  getColumnsByBoardID: Array<ColumnBoardType>;
  getCondByID: CondType;
  getCurrentUser: User;
  getCurrentUserSession?: Maybe<SessionType>;
  getCurrentUserSessions?: Maybe<Array<SessionType>>;
  getFilterById: FilterType;
  getGroupByID: GroupType;
  getIssueByID?: Maybe<IssueType>;
  getPermissionKeys: Array<PermissionKeyType>;
  getPermissionRulesByProjectID: Array<PermissionSchemeRuleType>;
  getPermissionRulesBySchemeID: Array<PermissionSchemeRuleType>;
  getProjecRoles: Array<ProjectRoleType>;
  getProjectByID: ProjectType;
  getProjectRoleMembers?: Maybe<Array<User>>;
  getRecentProjects: Array<ProjectType>;
  getRisk: RiskType;
  getStatusesByWorkflowID: Array<StatusType>;
  getTransitionByID: TransitionType;
  getUserByID?: Maybe<User>;
  getUserGroups: Array<GroupType>;
  getUserSessions?: Maybe<Array<SessionType>>;
  getUsersInGroup: Array<User>;
  getWorkflowByID: WorkflowType;
  getWorkflowByProjectID: WorkflowType;
};


export type QueryTestArgs = {
  TEST: FilterInput;
};


export type QueryFilterIssuesArgs = {
  Input: FilterInput;
};


export type QueryGetAllIssuesByProjectIdArgs = {
  Input: InputId;
};


export type QueryGetAllStatusesByProjectIdArgs = {
  Input: InputId;
};


export type QueryGetAllTransitionByStatusArgs = {
  StatusID?: InputMaybe<InputId>;
};


export type QueryGetAllTransitionsByWorkflowIdArgs = {
  InputID?: InputMaybe<InputId>;
};


export type QueryGetAllWorkflowsByProjectIdArgs = {
  Input: InputId;
};


export type QueryGetBoardByIdArgs = {
  BoardID: Scalars['Int']['input'];
};


export type QueryGetColumnsByBoardIdArgs = {
  ID: Scalars['Int']['input'];
};


export type QueryGetCondByIdArgs = {
  CondID: InputId;
};


export type QueryGetFilterByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetGroupByIdArgs = {
  GetGropByID: Scalars['Int']['input'];
};


export type QueryGetIssueByIdArgs = {
  Input: InputId;
};


export type QueryGetPermissionRulesByProjectIdArgs = {
  getPermissionRulesByProjectID: InputId;
};


export type QueryGetPermissionRulesBySchemeIdArgs = {
  InputID: InputId;
};


export type QueryGetProjectByIdArgs = {
  Input: InputId;
};


export type QueryGetProjectRoleMembersArgs = {
  getProjectRoleMembers: GetProjectRoleMemberInput;
};


export type QueryGetRiskArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetStatusesByWorkflowIdArgs = {
  getWorkflowStatuses: InputId;
};


export type QueryGetTransitionByIdArgs = {
  ID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserByIdArgs = {
  ID: Scalars['Int']['input'];
};


export type QueryGetUserGroupsArgs = {
  GetUserGroups: Scalars['Int']['input'];
};


export type QueryGetUserSessionsArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUsersInGroupArgs = {
  GetUsersInGroup: Scalars['Int']['input'];
};


export type QueryGetWorkflowByIdArgs = {
  Input: InputId;
};


export type QueryGetWorkflowByProjectIdArgs = {
  Input: InputId;
};

export type RegisterInput = {
  /** Адрес электронной почты пользователя */
  email: Scalars['String']['input'];
  /** Имя пользователя */
  name: Scalars['String']['input'];
  /** Пароль */
  password: Scalars['String']['input'];
  /** Отчество пользователя */
  patronymic: Scalars['String']['input'];
  /** Фамилия пользователя */
  surname: Scalars['String']['input'];
};

export enum RelatedEntityType {
  Comment = 'COMMENT',
  Issue = 'ISSUE',
  Project = 'PROJECT',
  System = 'SYSTEM',
  User = 'USER'
}

export type RiskType = {
  __typename?: 'RiskType';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  impact: Scalars['Int']['output'];
  mitigationPlan: Scalars['String']['output'];
  probability: Scalars['Float']['output'];
  status: Scalars['String']['output'];
};

export type SessionType = {
  __typename?: 'SessionType';
  createdAt: Scalars['Date']['output'];
  device: DeviceType;
  deviceId: Scalars['String']['output'];
  expireIn: Scalars['Int']['output'];
  session_uuid: Scalars['String']['output'];
  user: User;
};

export type SetNewPassForgot = {
  double_password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortType = {
  __typename?: 'SortType';
  field: Scalars['String']['output'];
  order: Scalars['String']['output'];
};

export type StatusMetaInput = {
  posX?: InputMaybe<Scalars['Float']['input']>;
  posY?: InputMaybe<Scalars['Float']['input']>;
  variant?: InputMaybe<StatusStyleVariant>;
};

export type StatusMetaType = {
  __typename?: 'StatusMetaType';
  ID: Scalars['Int']['output'];
  posX: Scalars['Int']['output'];
  posY: Scalars['Int']['output'];
  variant: StatusStyleVariant;
};

export enum StatusStyleVariant {
  Default = 'DEFAULT',
  Primary = 'PRIMARY',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type StatusType = {
  __typename?: 'StatusType';
  /** Идентификатор статуса */
  ID: Scalars['Int']['output'];
  /** Доступ для перехода на этот статус */
  cond?: Maybe<CondType>;
  /** Конечный статус */
  is_finished: Scalars['Boolean']['output'];
  /** Начальный статус */
  is_initial: Scalars['Boolean']['output'];
  /** Cтатус в процессе */
  on_process: Scalars['Boolean']['output'];
  /** Идентификатор родительского бизнес-процесса */
  parent?: Maybe<WorkflowType>;
  /** Метаданные статуса */
  status_meta: StatusMetaType;
  /** Название статуса */
  title?: Maybe<Scalars['String']['output']>;
  /** Переходы статусов */
  transitions?: Maybe<Array<TransitionType>>;
};

export type TransitionMeta = {
  __typename?: 'TransitionMeta';
  ID: Scalars['Int']['output'];
  sourceHandle: HandleTypeId;
  targetHandle: HandleTypeId;
};

export type TransitionMetaInput = {
  sourceHandle: HandleTypeId;
  targetHandle: HandleTypeId;
};

export type TransitionPermissionSchemeRuleInput = {
  /** Идентификатор перехода */
  ID: Scalars['Int']['input'];
  group?: InputMaybe<Array<InputId>>;
  is_Assegnee?: InputMaybe<Scalars['Boolean']['input']>;
  is_Owner?: InputMaybe<Scalars['Boolean']['input']>;
  is_Project_Lead?: InputMaybe<Scalars['Boolean']['input']>;
  projectRole?: InputMaybe<Array<InputId>>;
  user?: InputMaybe<Array<InputId>>;
};

export type TransitionType = {
  __typename?: 'TransitionType';
  ID?: Maybe<Scalars['Int']['output']>;
  parent?: Maybe<StatusType>;
  permission?: Maybe<PermissionSchemeRuleType>;
  title?: Maybe<Scalars['String']['output']>;
  to?: Maybe<StatusType>;
  transition_meta: TransitionMeta;
};

export type UpdateColumnInput = {
  ID: Scalars['Int']['input'];
  column_name?: InputMaybe<Scalars['String']['input']>;
  column_position?: InputMaybe<Scalars['Int']['input']>;
  statuses?: InputMaybe<Array<InputId>>;
};

export type UpdateGroupInput = {
  /** Идентификатор группы */
  ID: Scalars['Int']['input'];
  /** Описание группы */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Имя группы */
  group_name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIssueInput = {
  /** Идентификатор запроса */
  ID: Scalars['Int']['input'];
  assignee?: InputMaybe<InputId>;
  author?: InputMaybe<InputId>;
  components?: InputMaybe<Array<InputId>>;
  description?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['DateTime']['input']>;
  issueType?: InputMaybe<InputId>;
  /** Родительская задача */
  parentIssue?: InputMaybe<InputId>;
  project?: InputMaybe<InputId>;
  /** Текущее состояние запроса */
  status?: InputMaybe<InputId>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyProfile = {
  ID: Scalars['Int']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermissionSchemeRuleInput = {
  ID: Scalars['Int']['input'];
  group?: InputMaybe<Array<InputId>>;
  is_Assegnee?: InputMaybe<Scalars['Boolean']['input']>;
  is_Owner?: InputMaybe<Scalars['Boolean']['input']>;
  is_Project_Lead?: InputMaybe<Scalars['Boolean']['input']>;
  projectRole?: InputMaybe<Array<InputId>>;
  user?: InputMaybe<Array<InputId>>;
};

export type UpdateProjectComponentInput = {
  ID: Scalars['Int']['input'];
  defaultExecuter?: InputMaybe<InputId>;
  description?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<InputId>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  ID: Scalars['Int']['input'];
  /** Описание проекта */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Изображение проекта */
  image?: InputMaybe<Scalars['Upload']['input']>;
  /** Ключ проекта */
  key?: InputMaybe<Scalars['String']['input']>;
  /** Руководитель проекта */
  lead?: InputMaybe<Scalars['Int']['input']>;
  /** Имя проекта */
  project_name?: InputMaybe<Scalars['String']['input']>;
  workflow?: InputMaybe<InputId>;
};

export type UpdateRiskDto = {
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  impact?: InputMaybe<Scalars['Float']['input']>;
  mitigationPlan?: InputMaybe<Scalars['String']['input']>;
  probability?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  /** Идентификатор обновляемого пользователя пользователя (сам ID изменить нельзя) */
  ID: Scalars['Int']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isActivated?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  patronymic?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkflowInput = {
  ID: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Идернификатор пользователя */
  ID: Scalars['Int']['output'];
  /** Аватар пользователя */
  avatar?: Maybe<FileEntity>;
  /** Подразделение */
  department?: Maybe<Scalars['String']['output']>;
  /** Адрес электронной почты пользователя */
  email?: Maybe<Scalars['String']['output']>;
  /** Пользовательский статус */
  isActivated?: Maybe<Scalars['Boolean']['output']>;
  /** Имя пользователя */
  name?: Maybe<Scalars['String']['output']>;
  /** Отчество пользователя */
  patronymic?: Maybe<Scalars['String']['output']>;
  /** Дата регистрации пользователя */
  register_date: Scalars['Date']['output'];
  /** Фамилия пользователя */
  surname?: Maybe<Scalars['String']['output']>;
  /** Дата последнего обновления пользователя */
  updated_date?: Maybe<Scalars['Date']['output']>;
};

export type WorkflowType = {
  __typename?: 'WorkflowType';
  /** ID бизнес-процесса */
  ID: Scalars['Int']['output'];
  /** Дата создания бизнес процесса */
  create_date: Scalars['DateTime']['output'];
  /** Описание бизнес-процесса */
  description?: Maybe<Scalars['String']['output']>;
  issueType: Array<IssueTypeEntity>;
  /** Массив статусов бизнес-процесса */
  statuses?: Maybe<Array<StatusType>>;
  /** Название бизнес-процесса */
  title: Scalars['String']['output'];
  /** Дата обновления бизнес процесса */
  update_date: Scalars['DateTime']['output'];
};

export enum Board_Type {
  Kanban = 'kanban',
  Sprint = 'sprint'
}
