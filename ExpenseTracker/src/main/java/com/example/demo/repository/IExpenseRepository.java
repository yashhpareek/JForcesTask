package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Expense;
@Repository
public interface IExpenseRepository extends JpaRepository<Expense, Long>{
	List<Expense> findByUserId(Long userId);
}
