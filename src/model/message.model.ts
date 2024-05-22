import {DataTypes, Model, Optional} from "sequelize"
import sequelize from "../config/db.config";

interface MessageAttributes {
  id: number;
  prompt: string;
  response: string;
  followUpQuestions: any;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface MessageInput extends Optional<MessageAttributes, "id"> {}
export interface MessageOutput extends Required<MessageAttributes> {}

class Message
  extends Model<MessageAttributes, MessageInput>
  implements MessageAttributes
{
 public id!: number;
 public prompt!: string;
 public response!: string;
 public followUpQuestions!:  any;


 //timestamps
 public readonly createdAt!: Date;
 public readonly updatedAt!: Date;

}


Message.init({
 id: {
  type: DataTypes.INTEGER.UNSIGNED,
  autoIncrement: true,
  primaryKey: true,
 },
 prompt: {
  type: DataTypes.TEXT
 },
 response: {
  type: DataTypes.TEXT
 },
 followUpQuestions: {
  type: DataTypes.JSON
 }
},   {
 sequelize,
 timestamps: true,
})

export default Message