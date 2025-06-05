import React, {useEffect, useState} from 'react';
import BillCardList from "../component/card/BillCardList.jsx";
import BillService from "../../../API/BillService.js";
import Loader from "../../../../../components/loader/Loader.jsx";
import PageToolbar from "../../../components/toolbar/PageToolbar.jsx";
import CreateButton from "../../../components/UI/Button/CreateButton.jsx";
import {useNavigate} from "react-router-dom";

    const BillsPage = () => {
        const navigate = useNavigate();
        const [bills, setBills] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const fetchBills = async () => {
                try {
                    const data = await BillService.getAll();
                    setBills(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }

            }
            fetchBills();
        }, [])

        if(isLoading) {
            return (<Loader/>)
        }

        return (
            <div>
                <PageToolbar rightContent={<CreateButton onClick={() => navigate(`/bills/create`)} />}
                             title="Рахунки"
                             color="var(--primary-color)"/>
                <h1 style={{textAlign: "center"}}>Рахунки</h1>
                <h3 style={{textAlign: "center"}}>{bills.length} з 12 </h3>
                <BillCardList bills={bills} />
            </div>
        );
    };

    export default BillsPage;