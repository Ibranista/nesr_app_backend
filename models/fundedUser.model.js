import { AddressModel } from "./shared/Schemas";
import mongoose from 'mongoose';

const fundedUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hasFamily: {
        type: Boolean,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: AddressModel,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        default: function () {
            // Check the value of 'sex' and return the appropriate URL
            return this.sex === 'female'
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbTQRrYgXgiE6Icbs3Gzdq5T8CEQ1lhQXug&s"
                : "https://www.svgrepo.com/show/61986/avatar.svg";
        },
    },
    specificNeeds: {
        type: Map,
        of: String,
        required: true
    }
});

const FundedUser = mongoose.model('FundedUser', fundedUserSchema);

export default FundedUser;
