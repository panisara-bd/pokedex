const BASE_URL = 'http://localhost:3000';

export type PaginatedResponse<Collection> = {
    docs: Collection[],
    totalDocs: number
    totalPages: number
    page: number
    hasPrevPage: boolean
    hasNextPage: boolean
}

export type User = {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}

export const getUsers = () => fetch(`${BASE_URL}/api/users`);
