const advanceResults = (model, populate) => async (req, res, next) => {
  let query;
  // copy req.query

  const reqQuery = { ...req.query };

  //fields to exclude

  const removeFields = ['select', 'sort', 'pageNumber', 'keyword'];

  // lopp over the removeFields and delete them from query

  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string

  let queryStr = JSON.stringify(reqQuery);

  // create operators

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  // finding resource
  const queryString = JSON.parse(queryStr);
  // finding bootcamps and also reverse populate with courses
  query = model.find(queryString);
  // select fields
  /*if (req.query.keyword) {
    const keyword = {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    };
    query = query.find({ ...keyword });
  } */

  if (model === Bootcamp) {
    if (req.query.keyword) {
      const keyword = {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      };
      query = query.find({ ...keyword });
    }
  } else if (model === Course) {
    if (req.query.keyword) {
      const keyword = {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      };
      query = query.find({ ...keyword });
    }
  }

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query.sort('-createdAt');
  }

  // pagination
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const total = await model.countDocuments(query);

  query = query.limit(pageSize).skip(pageSize * (page - 1));
  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  // creates a pagination object in the response to tell clients how many more results are on the next page
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: pageSize,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: pageSize,
    };
  }

  if (!results) {
    res.status(404);
    throw new Error('model Not Found');
  }

  res.advanceResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
    page,
    pages: Math.ceil(total / pageSize),
  };
  next();
};

module.exports = advanceResults;
