
import type { Document } from "mongoose";
export interface IPatient extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    profileImage?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    dateOfBirth?: Date;
    gender?: "Male" | "Female" | "Other";
    userType?: string;
    medicalHistory?: string;
    allergies?: string;
    bloodGroup?: string;
    emergencyContactPhone?: string;
    emergencyContactRelationship?: string;
    insuranceProvider?: string;
    insuranceId?: string;
    lastVisitDate?: Date;
    height?: number;
    weight?: number;
    currentConditions?: string;
    preConditions?: string;
    isActive?: boolean;
    isVerified?: boolean;
    verificationToken?: string;
    refreshToken?: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
  }