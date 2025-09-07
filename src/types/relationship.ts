export type RelationshipType =
  | 'spouse'
  | 'parentChild'
  | 'sibling'
  | 'colleague'
  | 'classmate'
  | 'friend'
  | 'debtorCreditor';

export type RelationshipCategory =
  | 'family'
  | 'work'
  | 'school'
  | 'social'
  | 'financial';

export const RelationshipTypeLabel: Record<RelationshipType, string> = {
  spouse: '配偶',
  parentChild: '父/母→子',
  sibling: '兄弟姐妹',
  colleague: '同事',
  classmate: '同学',
  friend: '朋友',
  debtorCreditor: '债务人→债权人',
};

export interface Relationship {
  id: string;
  from: string;
  to: string;
  type: RelationshipType;
  note?: string;
  createdAt?: string;
}
