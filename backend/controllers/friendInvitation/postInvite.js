const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user

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

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Zaproszenie zostało już wysłane.");
  }

  // check if the user whuch we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Podany znajomy znajduje się już na Twojej liście znajomych.");
  }

  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invtiation has been successfully created we would like to update friends invitations if other user is online

  // send pending invitations update to specific user
  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Zaproszenie wysłane");
};

module.exports = postInvite;
