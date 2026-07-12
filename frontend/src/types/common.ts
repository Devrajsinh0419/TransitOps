export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'failed';
