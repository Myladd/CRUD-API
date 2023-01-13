import express from "express";
import {v4 as uuidv4} from 'uuid'

const router = express.Router();

let users = []

router.get('/', (req, res) => {
  res.send(users)
});

router.post('/', (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send(`user with name ${user.firstName} added to DB`);
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const findUser = users.find((user) => user.id === id)

  res.send(findUser)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`user with id ${id} deleted from db`)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const {firstName, lastName, age} = req.body
  const user = users.find((user) => user.id === id)
  if (firstName) user.firstName = firstName
  if (lastName) user.lastName = lastName
  if (age) user.age = age

  res.send(`user with id ${id} modified`)
})
export default router