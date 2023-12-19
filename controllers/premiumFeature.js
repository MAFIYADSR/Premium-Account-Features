const User = require('../models/user');
const Expense = require('../models/expenses');
const sequelize = require('../util/database');
const { use } = require('../routes/premiumFeature');

const getUserLeaderBoard = async (req, res) => {
    try{
        const users = await User.findAll()
        const expenses = await Expense.findAll();
        const userAggregetedExpenses = {}
        expenses.forEach((expense) => {
            
            if(userAggregetedExpenses[expense.userId]){
                userAggregetedExpenses[expense.userId] =  userAggregetedExpenses[expense.userId] + expense.expenseamount
            }
            else{
                userAggregetedExpenses[expense.userId] = expense.expenseamount
            }
        })

        var userLeaderBoardDetails = [];

        users.forEach((user) => {
            userLeaderBoardDetails.push({name: user.name, total_cost : userAggregetedExpenses[user.id]} || 0)
        })
        userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost)
        console.log(userLeaderBoardDetails);
        res.status(200).json(userLeaderBoardDetails)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard
}