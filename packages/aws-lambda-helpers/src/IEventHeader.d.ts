export interface IEventHeader {
  userId: string;
  userGroups?: string[];
  userRoles?: string[];
  userEmail?: string;
  source?: any;
}
