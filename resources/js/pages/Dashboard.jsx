import DefaultLayout from "@/layouts/DefaultLayout";
import DataStatsThree from "@/components/DataStats/DataStatsThree";
import ChartSeven from "@/components/Charts/ChartSeven";
import ChartEight from "@/components/Charts/ChartEight";
import LeadsReport from "@/components/LeadsReport";
import ChartNine from "@/components/Charts/ChartNine";
import ToDoList from "@/components/Todo/ToDoList";

const Dashboard = () => {
    return (
        <DefaultLayout>
            <DataStatsThree />

            <div className="mt-7.5 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                <div className="col-span-12 xl:col-span-7">
                    <ChartSeven />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <ChartEight />
                </div>

                <LeadsReport />

                <div className="col-span-12 xl:col-span-5">
                    <ChartNine />
                </div>

                <ToDoList />
            </div>
        </DefaultLayout>
    );
}

export default Dashboard;

