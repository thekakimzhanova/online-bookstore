package com.aliya.onlinebookstore.repository;

import com.aliya.onlinebookstore.entity.Book;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

}