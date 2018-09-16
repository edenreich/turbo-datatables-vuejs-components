
export class Paginator
{
    private items: Array<object>;
    private total: number;
    private perPage: number;
    private current: number;
    private prev: number;
    private next: number;

    constructor(items: Array<object>, total: number, perPage: number, currentPage?: number)
    {
        this.items = items;
        this.total = total;
        this.perPage = perPage;
        this.current = currentPage;
        this.prev = (currentPage <= 1) ? currentPage : currentPage-1;
        this.next = (currentPage >= this.getTotalPages()) ? this.getTotalPages() : currentPage+1;
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
            prevPageUrl: `?page=${this.getPrev()}`
        };
    }

    public getItems(): Array<object>
    {
        return this.items;
    }
}
