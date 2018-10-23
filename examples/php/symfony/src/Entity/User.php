<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User
{
    /**
     * @var int $id
     * 
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string $name
     * 
     * @ORM\Column(type="string")
     */
    private $name;

    /**
     * @var string $email
     * 
     * @ORM\Column(type="string")
     */
    private $email;
    
    /**
     * @var date $email_verified_at
     * 
     * @ORM\Column(type="date")
     */
    private $email_verified_at;
    
    /**
     * @var string $password
     * 
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var datetime $created_at
     *
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @var datetime $updated_at
     * 
     * @ORM\Column(type="datetime", nullable = true)
     */
    private $updated_at;

    /**
     * Gets triggered only on insert
     * @ORM\PrePersist
     * 
     * @return void
     */
    public function onPrePersist()
    {
        $this->created_at = new \DateTime('now');
    }

    /**
     * Gets triggered every time on update
     * @ORM\PreUpdate
     * 
     * @return void
     */
    public function onPreUpdate()
    {
        $this->updated_at = new \DateTime('now');
    }

    /**
     * Getter for the user id.
     * 
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }
}
