<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Note::index');

$routes->get('/notes', 'Note::getNotes');

$routes->post('/notes', 'Note::create');

$routes->post('/notes/update/(:num)', 'Note::update/$1');

$routes->delete('/notes/(:num)', 'Note::delete/$1');
