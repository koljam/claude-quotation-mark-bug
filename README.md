
# Expected output:
 ```json
 {
   "input": {
     "meetings": [
       {
         "title": "Meeting about „Solar Energy“ and „Wind Power“",
         "date": "2024-03-15"
       }
     ]
   }
 }
 ```

# Received output:
```json
{
    "input":{
        "meetings": "[\n  {\n    \"title\": \"Meeting about „Solar Energy\" and „Wind Power\"\",\n    \"date\": \"2024-03-15\"\n  }\n]"
    }
}
 ```

# Explanation:

The `\"`after `Solar Energy` and `Wind Power` closes the string in the JSON, leading to a sytax error while parsing the JSON on Anthropics side. The API then returns the string of the malformed object which is impossible to parse.
