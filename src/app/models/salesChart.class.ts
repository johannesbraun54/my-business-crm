import { userService } from "../service/userService.service";

export class salesChart {

    salesData;
    labels;

    constructor(public userService: userService) {
        this.labels = ['Jan', 'Feb', 'Mar', 'Apr'];
        this.salesData = {
            labels: this.labels,
            datasets: [{
                label: 'Sales in €',
                data: [this.userService.januaryRevenue,
                this.userService.februaryRevenue,
                this.userService.marchRevenue],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };
    }
}