
export class Paginator
{
    private items: object[];
    private total: number;
    private perPage: number;
    private current: number;
    private prev: number;
    private next: number;

    constructor(items?: object[], total?: number, perPage?: number, currentPage?: number)
    {
        this.paginate(items, total, perPage, currentPage);
    }

    public paginate(items: object[], total: number, perPage: number, currentPage?: number): void
    {
        this.items = items;
        this.total = total;
        this.perPage = perPage;
        this.current = currentPage || 1;
        this.prev = (currentPage <= 1) ? currentPage : currentPage - 1;
        this.next = (currentPage >= this.getTotalPages()) ? this.getTotalPages() : currentPage + 1;
    }

    public getTotal(): number
    {
        return this.total;
    }

    public getTotalPages(): number
    {
        return Math.ceil(this.total / this.perPage);
    }

    public getNext(): number
    {
        return this.next;
    }

    public getPrev(): number
    {
        return this.prev;
    }

    public getCurrent(): number
    {
        return this.current;
    }

    public getPerPage(): number
    {
        return this.perPage;
    }

    public getFrom(): number
    {
        return (this.getCurrent() - 1) * this.getPerPage() + 1;
    }

    public getTo(): number
    {
        return this.getFrom() + this.itemsCount() - 1;
    }

    public getPagination(): object
    {
        return {
            currentPage: this.getCurrent(),
            nextPage: this.getNext(),
            prevPage: this.getPrev(),
            lastPage: this.getTotal(),
            total: this.getTotal(),
            totalPages: this.getTotalPages(),
            lastPageUrl: `?page=${this.getTotalPages()}`,
            nextPageUrl: `?page=${this.getNext()}`,
            prevPageUrl: `?page=${this.getPrev()}`,
            from: this.getFrom(),
            to: this.getTo()
        };
    }

    public getItems(): object[]
    {
        return this.items;
    }

    public itemsCount(): number
    {
        return this.items.length;
    }
}
