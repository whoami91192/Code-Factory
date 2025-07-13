package com.bookreviewhub.repository;

import com.bookreviewhub.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
