# Terraform

- Provisioners
  - local
  - remote_exec
  - file
- Remote state
  - S3 bucket
- Modules
  - logical grouping of resources ( two or more )
  - create own modules
  - reuse existing modules
    - Terraform
    - Developers (Individual developers)
    - Companies

# Popular commands

- terraform init => apply
- terraform plan => state list
- terraform apply --auto-approve => destroy

# modules

```js

// module
//  -> main.tf
//  -> output.tf => resource which you want to expose/export
//  -> variable.tf => reusable peice of parameters

// Syntax
module <module_name>{
    source = "..."
}
// Reference a module
resource "aws-subnet" "subnet-1"{
    id = module.<module_name>.id
}


```

- Define values in => `variables.tfvars`
  - ex: cidr_subnet_block = "10.0.0.24/10"
- Declare the variable in => `variables.tf`
  - ex: cidr_subnet_block {}
- access it in `main.tf` file => var.<variable_name>
  - ex: id = var.cidr_subnet_block
- `output.tf` in root module is used to display values on terminal
