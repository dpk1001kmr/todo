class APIQuery {
  constructor(queryObject, query) {
    this.queryObject = queryObject;
    this.query = query;
  }

  filter() {
    const exclusiveQueries = ["page", "limit", "sort", "fields"];
    const inclusiveQueries = { ...this.query };
    exclusiveQueries.forEach((query) => {
      delete inclusiveQueries[query];
    });
    // console.log("Query => ", req.query);
    // console.log("ExclusiveQueries => ", exclusiveQueries);
    // console.log("InclusiveQueries => ", inclusiveQueries);
    this.queryObject = this.queryObject.find(inclusiveQueries);
    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(",").join(" ");
      this.queryObject = this.queryObject.sort(sortBy);
    } else {
      this.queryObject = this.queryObject.sort("-createdAt");
    }
    return this;
  }

  pagination() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.queryObject = this.queryObject.skip(skip).limit(limit);
    return this;
  }

  select() {
    if (this.query.fields) {
      const selectedFields = this.query.fields.split(",").join(" ");
      this.queryObject = this.queryObject.select(selectedFields);
    } else {
      this.queryObject = this.queryObject.select("-__v");
    }
    return this;
  }
}

export { APIQuery };
