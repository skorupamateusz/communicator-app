const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Nie możesz zostać znajomym samego siebie..");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Użytkownik ${targetMailAddress} nie został znaleziony. Sprawdź wprowadzony adres e-mail i spróbuj ponownie.`
      );
  }

  // check if invitation has been sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Zaproszenie zostało już wysłane.");
  }

  // check if the user is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Podany znajomy znajduje się już na Twojej liście znajomych.");
  }

  // create invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());
  return res.status(201).send("Zaproszenie wysłane");
};

module.exports = postInvite;