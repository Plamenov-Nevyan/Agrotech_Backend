exports.sortPublications = (sortType, publications) => {
    if(sortType == 'oldest'){
        return publications.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      }
      else if(sortType == 'recent'){
        return publications.sort((a,b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
      }
      else if(sortType === 'mostPopular') {
        return publications.sort((a,b) => b.likedBy.length + b.followedBy.length - a.likedBy.length + a.followedBy.length)
      }
      else if(sortType === 'leastPopular'){
        return publications.sort((a,b) => a.likedBy.length + a.followedBy.length - b.likedBy.length + b.followedBy.length)
      }
      else if(sortType = 'mostExpensive'){
        return publications.sort((a,b) => a.price  - b.price)
      }
      else if(sortType = 'cheapest'){
        return publications.sort((a,b) => b.price - a.price)
      }
}