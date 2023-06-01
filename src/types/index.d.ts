export interface IRepository<T> {
    find: (id: number) => Promise<T | null>,
    delete: (id: number) => Promise<T>,
    save: (...arg: any[]) => Promise<T>,
    fetch: () => Promise<T[]>,
    paginate: (query: IQuery) => Promise<Paginate<T>>,
    findBy: (query: Record<string, any>) => Promise<T[]>,
}

export interface Paginate<T> {
    data: T[],
    count: number,
    take: number,
    page: number
}

export interface IQuery {
    keyword?: string | number
    take?: number,
    page?: number,
    skip?: number
}

export interface ApiResponse<T>{
    success: boolean
    message?: string
    error?: string
    data?: T
    error_code?: string
}