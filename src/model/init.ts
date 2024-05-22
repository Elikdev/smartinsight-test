import Message from "./message.model";

const isDev =
 process.env.NODE_ENV === "development" || process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "local";

const dbInit = () => {
 try {
   //Message.sync({ alter: isDev });
 } catch (error) {
   console.log(error);
 }
};
export default dbInit;
