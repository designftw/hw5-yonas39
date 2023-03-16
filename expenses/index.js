import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp(
  {
    data: {
      expenses: [],
      name: "",
      currencyfrom: [
        { name: "USD", desc: "Dollar" },
        { name: "EUR", desc: "Euro" },
        { name: "PWD", desc: "Pound sterling" },
      ],
      convertfrom: "USD",
      convertto: "EUR",
      amount: "",

      newtitle: "",
      new_amount: "",
      new_date: "",

      new_neo_paid: "",
      new_trinity_paid: "",

      new_neo_for_trinity: "",
      new_trinity_for_neo: "",

      new_trinity_self: "",
      new_neo_self: "",

      paid_to_joint: "",

      payer: "",
      payee: "",
    },

    methods: {
      AddExpense() {
        // trintity pays joint ---> neo ows half  or the opposite
        //payer and payee  then sum the two and assingn half of the value
        // trinty to neo or neo to trinity --> the other person ows the full amount
        // triniyt for trinty or neo for neo for keeping track of their expenses
        // alert(this.new_neo_paid);
        if (this.expenses.payer === "neo") {
          if (this.expenses.payee == "trinity") {
            this.expenses.payee = "trinity";
            this.new_neo_for_trinity = this.new_amount;
          } else if (this.expenses.payee == "joint") {
            this.expenses.payee = "joint";
            this.new_neo_paid = this.new_amount / 2;
            this.new_neo_for_trinity = this.new_amount / 2;
          } else {
            this.new_neo_self = this.new_amount;
            this.expenses.payee = "neo";
          }
          // this.new_neo_paid = this.new_amount;
        } else if (this.expenses.payer === "trinity") {
          // alert(this.expenses.payer);
          if (this.expenses.payee == "neo") {
            this.expenses.payee = "neo";
            this.new_trinity_for_neo = this.new_amount;
          } else if (this.expenses.payee == "joint") {
            this.expenses.payee = "joint";
            this.new_trinity_paid = this.new_amount / 2;
            this.new_trinity_for_neo = this.new_amount / 2;
          } else {
            this.expenses.payee = "trinity";
            this.new_trinity_self = this.new_amount;
          }
        }

        //
        // if (this.expenses.payee == "neo") {
        //   this.neo_recieved = this.new_amount;
        // } else if (this.expenses.payee == "trinity") {
        //   this.trinity_recieved = this.new_amount;
        // } else if (this.expenses.payee == "joint") {
        //   this.neo_recieved = this.new_amount / 2;
        //   this.trinity_recieved = this.new_amount / 2;
        // }
        // else if (this.expenses.payee == "joint") {
        //   this.paid_to_joint = this.new_amount;
        // }
        // alert(this.expenses.payer);

        //
        // alert(this.new_neo_paid);
        this.expenses.push({
          title: this.newtitle,
          neo_paid: this.new_neo_paid,
          trinity_paid: this.new_trinity_paid,

          trinity_paid_for_neo: this.new_trinity_for_neo,
          neo_paid_for_trinity: this.new_neo_for_trinity,

          neo_self: this.new_neo_self,
          trinity_self: this.new_trinity_self,

          payee: this.expenses.payee,

          date: this.new_date,
        });
        this.expenses.save();
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

        return total;
      },

      finalamount: function () {
        var to = this.convertto;
        var from = this.convertfrom;
        var final;
        switch (from) {
          case "USD":
            if (to == "EUR") {
              final = this.amount * 0.5;
            }
            if (to == "PWD") {
              final = this.amount * 0.8;
            }
            if (to == "USD") {
              final = this.amount;
            }
            break;
          case "PWD":
            if (to == "EUR") {
              final = this.amount * 1.1;
            }
            if (to == "PWD") {
              final = this.amount;
            }
            if (to == "USD") {
              final = this.amount * 1.3;
            }
            break;
          case "EUR":
            if (to == "EUR") {
              final = this.amount;
            }
            if (to == "PWD") {
              final = this.amount * 0.9;
            }
            if (to == "USD") {
              final = this.amount * 1.1;
            }
            break;
        }
        return final;
      },
    },
  },
  "#app"
);
