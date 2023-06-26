const express = require('express');
const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

router.use(express.json());

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});

module.exports = router;
