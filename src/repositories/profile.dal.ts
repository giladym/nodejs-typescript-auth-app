import ProfileModel from "../models/profile.model";

const SENSATIVE_USER_FIELDS = '-passwordd -OTPCode -OTPCodeExpires -passwordResetCode -businessId';

export async function getAllProfiles() {
    return await ProfileModel.find({})
    .populate({
        path: 'userId',
        select: SENSATIVE_USER_FIELDS
    })
    .exec();
}

export async function getProfileById(id: string) {
    return await ProfileModel.findById(id)
    .populate({
        path: 'userId',
        select: SENSATIVE_USER_FIELDS
    })
    .exec();
}

export async function findProfile ( 
    query: FilterQuery<IProfile>, 
    options: QueryOptions = {lean: true}
): Promise<IProfile | null> {
    return await ProfileModel.findOne(query, {}, options);
}

export async function createProfile(profile: IProfile) {
    try {
        const res = await ProfileModel.create(profile);
        return { data: res , success: true};
    } catch (error) {
        return { data: null, success: false, error: error };
    }
}

export async function updateProfileById(id: string, update: UpdateQuery<IProfile>) {
    try {
        const result = await ProfileModel.findByIdAndUpdate(id, update, { new: true });
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteProfileById(id: string) {
    return await ProfileModel.deleteOne({ _id: id });
}