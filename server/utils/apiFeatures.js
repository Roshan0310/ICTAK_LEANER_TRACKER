class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){

        const keyword = this.queryStr.keyword ? {
            courseName:{
                $regex:this.queryStr.keyword,
                $options: "i",
            }
        }:{};

        this.query = this.query.find({...keyword});

        return this;
    }

    filter(){
        const queryCopy = { ...this.queryStr}
        console.log(queryCopy);

        //removing some fields for coursename
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key]);
        console.log(queryCopy);

    }
};

module.exports = ApiFeatures;

