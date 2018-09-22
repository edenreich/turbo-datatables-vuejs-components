export declare class Paginator {
    private items;
    private total;
    private perPage;
    private current;
    private prev;
    private next;
    constructor(items?: object[], total?: number, perPage?: number, currentPage?: number);
    paginate(items: object[], total: number, perPage: number, currentPage?: number): void;
    getTotal(): number;
    getTotalPages(): number;
    getNext(): number;
    getPrev(): number;
    getCurrent(): number;
    getPerPage(): number;
    getFrom(): number;
    getTo(): number;
    getPagination(): object;
    getItems(): object[];
    itemsCount(): number;
}
