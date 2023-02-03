type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupType = {
  id: number;
  name: string;
  permissions: Array<Permission>;
};
