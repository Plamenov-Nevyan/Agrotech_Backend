exports.sortPublications = (sortType) => {
  let parameters;
    if(sortType == 'oldest'){
         parameters = {
            'createdAt' : 1
         };
      }
      else if(sortType == 'mostRecent'){
        parameters = {
          'createdAt' : -1
       }
      }
      else if(sortType === 'mostPopular') {
        parameters = {
          'followedBy' : -1,
          'likedBy' : -1
       };
      }
      else if(sortType === 'leastPopular'){
        parameters = {
          'followedBy' : 1,
          'likedBy' : 1
       };
      }
      else if(sortType = 'mostExpensive'){
        parameters = {
          'price' : -1
       };
      }
      else if(sortType = 'cheapest'){
        parameters = {
          'price' : 1
       };
      };
   return parameters;
}