import { IQuery } from "../types";

export const useQuery: (query: IQuery) => IQuery = (query) => {
    const take = query?.take ?? 10
    const page = query?.page ?? 1;
    const skip = (page - 1) * take;
    const keyword = query?.keyword ?? ''

    return {
        keyword: keyword,
        take: take,
        page: page,
        skip: skip
    }
}

export function usePagination(data: any, page: number, take: number) {
    const [result, total] = data;
    const lastPage = Math.ceil(total / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
        statusCode: 'success',
        data: [...result],
        count: total,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
    }
}