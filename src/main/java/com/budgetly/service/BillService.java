package com.budgetly.service;

import com.budgetly.model.dto.BillCreationDto;
import com.budgetly.model.dto.BillDto;
import com.budgetly.model.dto.TransferDto;
import com.budgetly.model.entity.Bill;
import com.budgetly.model.entity.User;
import com.budgetly.exception.ObjectAlreadyExistException;
import com.budgetly.exception.ForbiddenException;
import com.budgetly.model.mapper.BillMapper;
import com.budgetly.model.repository.BillRepository;
import com.budgetly.model.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class BillService {
    private final BillRepository billRepository;
    private final BillMapper billMapper;
    private final UserRepository userRepository;
    private static final int MAX_BILLS_PER_USER = 12;

    public List<BillDto> getAll(Long userId){
        List<Bill> bills = billRepository.findAllByUserId(userId);
        return bills.stream().map(billMapper::toDto).toList();
    }

    public BillDto getById(Long billId, Long userId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));

        if (!bill.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to access this bill.");
        }

        return billMapper.toDto(bill);
    }

    @Transactional
    public BillDto create(BillCreationDto billCreationDto,  Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (billRepository.existsByNameAndUser(billCreationDto.name(), user)) {
            throw new ObjectAlreadyExistException("Bill with name " + billCreationDto.name() + " already exists.");
        }

        if (billRepository.countAllByUserId(userId) >= MAX_BILLS_PER_USER) {
            throw new IllegalStateException("You cannot have more than " + MAX_BILLS_PER_USER + " bills.");
        }

        Bill bill = billMapper.toEntity(billCreationDto);
        bill.setUser(user);

        return billMapper.toDto(billRepository.save(bill));
    }

    @Transactional
    public BillDto update(Long billId, Long userId, BillDto billDto) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));

        if (!bill.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to update this bill.");
        }

        if (billDto.name() != null && !billDto.name().equals(bill.getName())) {
            if (billRepository.existsByNameAndUser(billDto.name(), bill.getUser())) {
                throw new ObjectAlreadyExistException("Bill with name " + billDto.name() + " already exists.");
            }
        }

        billMapper.partialUpdate(billDto, bill);

        return billMapper.toDto(billRepository.save(bill));
    }

    @Transactional
    public void transfer(TransferDto transferDto, Long userId) {
        if (transferDto.amount() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        Bill fromBill = billRepository.findById(transferDto.fromBillId())
                .orElseThrow(() -> new EntityNotFoundException("Source bill not found"));

        Bill toBill = billRepository.findById(transferDto.toBillId())
                .orElseThrow(() -> new EntityNotFoundException("Target bill not found"));

        if (!fromBill.getUser().getId().equals(userId) || !toBill.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have access to one or both of the bills");
        }

        if (fromBill.getBalance() < transferDto.amount()) {
            throw new IllegalArgumentException("Not enough funds on source bill");
        }

        double amountToTransfer = transferDto.amount();
        if (!fromBill.getCurrency().equals(toBill.getCurrency())) {
            double usdValue = amountToTransfer * fromBill.getCurrency().getRateToUSD();
            amountToTransfer = usdValue / toBill.getCurrency().getRateToUSD();
        }

        fromBill.setBalance(fromBill.getBalance() - transferDto.amount());
        toBill.setBalance(toBill.getBalance() + amountToTransfer);

    }

    @Transactional
    public void delete(Long billId, Long userId) {
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));

        if (!bill.getUser().getId().equals(userId)) {
            throw new ForbiddenException("You do not have permission to delete this bill.");
        }

        if (billRepository.countAllByUserId(userId) <= 1) {
            throw new IllegalStateException("You must have at least one bill.");
        }

        billRepository.delete(bill);
    }
}
