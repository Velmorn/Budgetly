package com.budgetly.utils;
import com.budgetly.model.entity.Bill;
import com.budgetly.model.entity.Category;
import com.budgetly.model.entity.User;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

import static com.budgetly.model.enums.CurrencyData.UAH;

@Component
public class DefaultUserDataProvider {
    public List<Category> getDefaultCategories(User user) {
        return List.of(
                new Category("Харчування", "/images/userIcons/cutlery.png", "#c2ccd2",  user),
                new Category("Продукти", "/images/userIcons/groceries.png","#bae0bb", user),
                new Category("Покупки", "/images/userIcons/shopping.png","#f7b1b0", user),
                new Category("Транспорт", "/images/userIcons/tram.png","#fff7b3", user),
                new Category("Розваги", "/images/userIcons/popcorn.png","#a9d6fa", user),
                new Category("Рахунки та збори", "/images/userIcons/bills.png","#bae0bb", user),
                new Category("Подарунки", "/images/userIcons/gift.png","#ffbeaa", user),
                new Category("Робота", "/images/userIcons/briefcase.png","#cbbdb8", user),
                new Category("Подорожі", "/images/userIcons/plane.png","#ffd89d", user),
                new Category("Доходи", "/images/userIcons/coin.png","#c4b3e3", user),
                new Category("Мистецтво", "/images/userIcons/color-palette.png","#f7b1b0", user)

        );
    }

    public Bill getDefaultBill(User user) {
        Bill bill = new Bill();
        bill.setName("Основний");
        bill.setBalance(0.0);
        bill.setCurrency(UAH);
        bill.setColor("#bae0bb");
        bill.setUser(user);
        return bill;
    }
}
