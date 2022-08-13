const {User} = require('../models/User')

module.exports = async (publicationToDelete) => {
  followers = publicationToDelete.followedBy
  likers = publicationToDelete.likedBy
  let [usersFollowed, usersLiked, owner] = await Promise.all([
     User.find(
        {_id : {$in : followers}}
     ),
     User.find(
        {_id : {$in : likers}}
     ),
     User.findById(publicationToDelete.owner)
  ]) 

  owner.publicationsCreated = owner.publicationsCreated.filter(publicationId => publicationId !== publicationToDelete._id)
  await owner.save()

  let biggestLength = Math.max(followers.length, likers.length)

  for(let currentUser = 0; currentUser < biggestLength; currentUser++){
     if(usersFollowed.length >= currentUser){

        let publication = usersFollowed[currentUser].publicationsFollowed.find(
            publicationFollowed => publicationFollowed == publicationToDelete._id
            )

        let indexOfPublication = usersFollowed[currentUser].publicationsFollowed.indexOf(publication)
        usersFollowed[currentUser].publicationsFollowed.splice(indexOfPublication, 1)

        await User.updateOne({_id : usersFollowed[currentUser]._id}, {publicationsFollowed : usersFollowed[currentUser].publicationsFollowed})
     }
     if(usersLiked.length >= currentUser){
        let publication = usersLiked[currentUser].publicationsLiked.find(
            publicationLiked => publicationLiked == publicationToDelete._id
            )

        let indexOfPublication = usersLiked[currentUser].publicationsLiked.indexOf(publication)
      
        usersLiked[currentUser].publicationsLiked.splice(indexOfPublication, 1)
        await User.updateOne({_id : usersLiked[currentUser]._id}, {publicationsLiked : usersLiked[currentUser].publicationsLiked})
     }
  }
}