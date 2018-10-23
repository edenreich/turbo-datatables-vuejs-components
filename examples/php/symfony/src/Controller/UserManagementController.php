<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

use App\Repository\UserRepository;

class UserManagementController extends AbstractController
{
    /**
     * @Route("/", name="index", methods={"GET"})
     */
    public function index()
    {
        return $this->render('example.html.twig');
    }

    /**
     * @Route("/users", name="user_management", methods={"GET"})
     */
    public function show(Request $request, UserRepository $user)
    {

    }
}
