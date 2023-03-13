import { createApp } from "https://mavue.mavo.io/mavue.js";

// globalThis.app = createApp(
//   {
//     data: {
//       expenses: [],
//       payer: [
//         { name: "Neo", desc: "Neo pay to Trinity" },
//         { name: "Trinity", desc: "Trinity pay to Neo" },
//       ],
//       payee: [
//         { name: "Neo", desc: "Neo pay to Trinity" },
//         { name: "Trinity", desc: "Trinity pay to Neo" },
//       ],
//       payment_amount: "",
//       discription: "",

//       name: "",
//       currencyfrom: [
//         { name: "USD", desc: "Dollar" },
//         { name: "EUR", desc: "Euro" },
//         { name: "PWD", desc: "Pound sterling" },
//       ],
//       convertfrom: "USD",
//       convertto: "EUR",
//       amount: "",

//       inputValues: [],
//     },
//     // methods: {
//     //   addInputBox() {
//     //     // this.expenses.push("amount");
//     //     this.inputValues.push("HEllo world");
//     //   },
//     //   removeInputBox(index) {
//     //     this.inputValues.splice(index, 1);
//     //   },
//     // },

//     computed: {
//       total_balance() {
//         let total = 0;

//         for (let expense of this.expenses) {
//           let trinity_paid = expense.trinity_paid ?? 0;
//           let neo_paid = expense.neo_paid ?? 0;
//           let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
//           let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

//           total +=
//             (trinity_paid - neo_paid) / 2 +
//             trinity_paid_for_neo -
//             neo_paid_for_trinity;
//         }

//         return total;
//       },

//       finalamount: function () {
//         var to = this.convertto;
//         var from = this.convertfrom;
//         var final;
//         switch (from) {
//           case "USD":
//             if (to == "EUR") {
//               final = this.amount * 0.5;
//             }
//             if (to == "PWD") {
//               final = this.amount * 0.8;
//             }
//             if (to == "USD") {
//               final = this.amount;
//             }
//             break;
//           case "PWD":
//             if (to == "EUR") {
//               final = this.amount * 1.1;
//             }
//             if (to == "PWD") {
//               final = this.amount;
//             }
//             if (to == "USD") {
//               final = this.amount * 1.3;
//             }
//             break;
//           case "EUR":
//             if (to == "EUR") {
//               final = this.amount;
//             }
//             if (to == "PWD") {
//               final = this.amount * 0.9;
//             }
//             if (to == "USD") {
//               final = this.amount * 1.1;
//             }
//             break;
//         }
//         return final;
//       },
//     },
//   },
//   "#app"
// );

globalThis.app = createApp(
  {
    data: {
      expenses: [],
      newExpense: { currency: "USD" },
      window: window,
    },

    methods: {
      /**
       * Currency convert function stub.
       * In a real app, you would use an API to get the latest exchange rates,
       * and we'd need to support all currency codes, not just EUR, USD and GBP.
       * However, for the purposes of this assignment, this is fine.
       * @param {"EUR" | "USD" | "GBP"} from - Currency code to convert from
       * @param {"EUR" | "USD" | "GBP"} to - Currency code to convert to
       * @param {number} amount - Amount to convert
       * @returns {number} Converted amount
       */
      currencyConvert(from, to, amount) {
        const rates = {
          USD: 1,
          EUR: 0.99,
          GBP: 0.85,
        };

        return ((amount * rates[to]) / rates[from]).toFixed(2);
      },

      addExpense() {
        if (this.newExpense.currency !== "USD") {
          this.newExpense.neo_paid = this.convert_to_USD(
            this.newExpense.currency,
            this.newExpense.neo_paid
          );
          this.newExpense.trinity_paid = this.convert_to_USD(
            this.newExpense.currency,
            this.newExpense.trinity_paid
          );
          this.newExpense.neo_paid_for_trinity = this.convert_to_USD(
            this.newExpense.currency,
            this.newExpense.neo_paid_for_trinity
          );
          this.newExpense.trinity_paid_for_neo = this.convert_to_USD(
            this.newExpense.currency,
            this.newExpense.trinity_paid_for_neo
          );
          this.newExpense.neo_paid_for_himself = this.convert_to_USD(
            this.newExpense.currency,
            this.newExpense.neo_paid_for_himself
          );
          this.newExpense.trinity_paid_for_herself = this.convert_to_USD(
            this.newExpense.currency,
            this.newExpense.trinity_paid_for_herself
          );
        }
        this.expenses.unshift(this.newExpense);
        this.newExpense = { currency: "USD" };
      },
      deleteExpense(expense) {
        this.expenses.splice(this.expenses.indexOf(expense), 1);
      },
      convert_to_USD(currency, expense_field) {
        return this.currencyConvert(currency, "USD", expense_field) == "NaN"
          ? ""
          : this.currencyConvert(currency, "USD", expense_field);
      },
    },

    computed: {
      total_balance() {
        let total = 0;

        for (let expense of this.expenses) {
          let trinity_paid = expense.trinity_paid ?? 0;
          let neo_paid = expense.neo_paid ?? 0;
          let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
          let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

          total +=
            (trinity_paid - neo_paid) / 2 +
            trinity_paid_for_neo -
            neo_paid_for_trinity;
        }

        return total.toFixed(2);
      },
    },
  },
  "#app"
);
