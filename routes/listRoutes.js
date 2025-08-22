import List from "../models/List.js";

const getLists= async (req, res) => {
  const lists = await List.find().populate("lists");
  res.json(lists);
};

const createList= async (req, res) => {
  const list = new List({ title: req.body.title });
  await list.save();
  res.status(201).json(list);
};

export { createList, getLists };
