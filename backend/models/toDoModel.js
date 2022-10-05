const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		duedate: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("ToDo", toDoSchema);
