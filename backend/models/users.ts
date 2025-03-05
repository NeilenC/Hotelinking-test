import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcrypt";

// Definir la interfaz para el documento de usuario
interface IUser extends Document {
  name: string;
  lastname: string;
  password: string;
  email: string;
  promocodes?: any[];
  salt?: string; 
  hash(password: string, salt: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  promocodes: {
    type: Array,
    required: false,
  },
  salt: {
    type: String,
    required: false,
  },
});

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSaltSync();
  this.salt = salt;

  const hash = await this.hash(this.password, salt);
  this.password = hash;
});

// Método para hashear una contraseña
UserSchema.methods.hash = async function (password: string, salt: string) {
  return bcrypt.hash(password, salt);
};

// Método para validar una contraseña
UserSchema.methods.validatePassword = async function (password: string) {
  const hash = await this.hash(password, this.salt!);
  return this.password === hash;
};

// Virtual para obtener el nombre completo
UserSchema.virtual("fullname").get(function () {
  return `${this.name} ${this.lastname}`;
});

// Función para capitalizar la primera letra de un string
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Middleware para capitalizar nombre y apellido antes de guardar
UserSchema.pre<IUser>("save", function (next) {
  this.name = capitalizeFirstLetter(this.name);
  this.lastname = capitalizeFirstLetter(this.lastname);
  next();
});

// Exportar el modelo
const User = models.User || model<IUser>("User", UserSchema);

export default User;