import { fileUploader } from "../helper/fileUpload";
import Actor from "./actor.schema";
import { AppError } from "../middleware/error";
import { Admin } from "../admin/admin.schema";
import Notification from "../notification/notification.schema";

const createActor = async (files: any, data: any) => {
  console.log(data);

  const uploadArray = async (fileArr: any[]) => {
    if (!fileArr || fileArr.length === 0) return [];
    const uploaded = await fileUploader.CloudinaryUploadMultiple(fileArr);
    return uploaded.map((u: any) => u.secure_url);
  };
  //  const characterPhoto= await uploadArray(files.characterPhoto);
  const frontPhoto = (await uploadArray(files.frontPhoto))[0] || null;
  const leftPhoto = (await uploadArray(files.leftPhoto))[0] || null;
  const rightPhoto = (await uploadArray(files.rightPhoto))[0] || null;

  const actorData = {
    profilePhoto: [
      {
        front: frontPhoto,
        left: leftPhoto,
        right: rightPhoto,
      },
    ],
    fullName: data.fullName,
    dob: data.dob,
    occupation: data.occupation,
    actorName: data.actorName,
    spouse: data.spouse,
    bloodGroup: data.bloodGroup,
    fromActive: data.fromActive ?? null,
    endActive: data.endActive ?? null,
    presentActive: data.endActive ? null : data.present,
    bio: data.bio ? data.bio : [],
  };
  if (!actorData) {
    throw new AppError(400, "No actor data provided");
  }
  const newActor = await Actor.create(actorData);
  if (!newActor) {
    throw new AppError(400, "Failed to create actor");
  }
  const admins = await Admin.find({});

  admins.forEach(async (admin) => {
    await Notification.create({
      senderId: newActor._id,
      recipientId: admin._id,
      type: "ACTOR_SUBMISSION",
      title: "New actor filled info",
      reference: newActor.fullName,
    });
  });

  return {
    actorinfo: newActor,
  };
};

const getSingleActor = async (actorId: string) => {
  if (!actorId) {
    throw new Error("No actor id provided");
  }
  const actor = await Actor.findById(actorId);
  if (!actor) {
    throw new Error("Actor not found");
  }
  return actor;
};


const getAllActor = async (search: string, category: string, limit: number, skip: number) => {
  console.log(category)
  console.log(skip)
  let filter: any = {};
  const fields = ["fullName", "presentAddress", "idNo", "phoneNumber"];
  if (search) {
    filter.$or = fields.map((field) => ({ [field]: { $regex: search.trim(), $options: "i" } }))
  }
  if (category === "A" || category === "B") {
    filter.category = category
  }

  const actor = await Actor.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

  const [totalActor, categoryACount, categoryBCount] = await Promise.all(
    [
      Actor.countDocuments(),
      Actor.countDocuments({ category: "A" }),
      Actor.countDocuments({ category: "B" })
    ]
  )
  const totalPage = Math.ceil((category === "A" ? categoryACount : (category === "B" ? categoryBCount : totalActor)) / limit)

  // if (category === "A" || category === "B") {

  //   return {
  //     actor: actor.filter(a => a.category === category),
  //     totalActor,
  //     categoryACount,
  //     categoryBCount,
  //     totalPage
  //   }
  // }


  if (actor.length === 0) {
    return { actor: [], totalActor, categoryACount, categoryBCount, totalPage };
  }
  return { actor, totalActor, categoryACount, categoryBCount, totalPage };
};

const filterByRank = async (rank: string) => {
  if (!rank) {
    throw new Error("No rank provided");
  }
  const actor = await Actor.find({ rank: rank });
  console.log("actor", actor);
  if (actor.length === 0) {
    return {
      success: true,
      message: "No data found",
      data: [],
    };
  }
  return actor;
};

const adminFillUpActorProfile = async (actorData: any) => {
  const actorProfile = {
    phoneNumber: actorData.phoneNumber,
    presentAddress: actorData.presentAddress,
    dateOfBirth: new Date(actorData.dateOfBirth),
    bloodGroup: actorData.bloodGroup,
    idNo: actorData.idNo,
    fullName: actorData.fullName,
    category: actorData.category,
  };
  console.log(actorData);
  const result = await Actor.create(actorProfile);
  if (!result) {
    throw new Error("Failed to fill up actor profile");
  }
  return result;
};
export const ActorService = {
  createActor,
  getSingleActor,
  getAllActor,
  filterByRank,
  adminFillUpActorProfile,
};
