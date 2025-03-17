const xlsx=require('xlsx');
const Expense=require("../models/Expense");



//code segment to add Expense source
exports.addExpense=async (req,res)=>{
    const userId=req.user.id;

    try{
        const {icon,category,amount,date}=req.body;
        //Checking for any empty fields
        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }
        const newExpense=new Expense({
                userId,
                icon,
                category,
                amount,
                date:new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }catch (error){
        res.status(500).json({message:"Server Error"});
    }
}
//getting all expense
exports.getAllExpense=async (req,res)=>{
    const userId=req.user.id;

    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        res.status(200).json(expense);
    }catch(error){
        console.error(error.message);
        res.status(500).json({message:"Server Error"});
    }
}
//delete em 
exports.deleteExpense=async (req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
    }catch (error){
        res.status(500).json({message:"Server Error"});
    }
};
//download excel
exports.downloadExpenseExcel=async (req,res)=>{
    const userId=req.user.id;
    try{
        const expense=await Expense.find({userId}).sort({date:-1});
        //prepare data fro excel
        const data=expense.map((item)=>({
            category:item.category,
            Amount:item.amount,
            Date:item.date.toISOString().split("T")[0],
        }));

        const wb=xlsx.utils.book_new();
        const ws=xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }catch (error){
        console.error("Error",error);
        res.status(500).json({message:"Server Error"});
    }
};