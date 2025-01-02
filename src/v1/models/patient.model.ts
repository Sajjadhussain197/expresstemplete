import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { IPatient } from "~/types/patient.types";



const patientSchema = new Schema<IPatient>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String, // cloudinary URL
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    userType: {
      type: String,
      default: "Patient",
    },
    medicalHistory: {
      type: String,
    },
    allergies: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    emergencyContactPhone: {
      type: String,
    },
    emergencyContactRelationship: {
      type: String,
    },
    insuranceProvider: {
      type: String,
    },
    insuranceId: {
      type: String,
    },
    lastVisitDate: {
      type: Date,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    currentConditions: {
      type: String,
    },
    preConditions: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre<IPatient>("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as mongoose.CallbackError);
  }
});

patientSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error as mongoose.CallbackError;
  }
};

patientSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    }
  );
};

patientSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    }
  );
};

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
