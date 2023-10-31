class APIFeatures {
    constructor(query, queryStr) {
            this.query = query;
            this.queryStr = queryStr;
        }
        // Size: Response per page
        // Page: Page index

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword });
        return this;
    }

    filter() {

        const queryCopy = {
            ...this.queryStr
        };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page', 'size']

        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(size, page) {
        const currentPage = Number(page) || 1;
        const skip = size * (currentPage - 1);

        this.query = this.query.limit(size).skip(skip);
        return this;
    }
}

module.exports = APIFeatures