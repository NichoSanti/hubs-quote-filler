#!/usr/bin/env python
# coding: utf-8

# In[1]:


import zipfile
import io
import json
import pandas as pd
import ipywidgets as widgets
from IPython.display import display


# In[2]:


# Upload button
upload_button = widgets.FileUpload(
    accept='.zip', 
    multiple=False
)
display(upload_button)


# In[4]:


# Button to process the uploaded file
process_button = widgets.Button(description="Process Files")
display(process_button)

def process_files(b):
    # Read the uploaded content
    uploaded_file = next(iter(upload_button.value.values()))
    content = uploaded_file['content']
    zip_stream = io.BytesIO(content)

    with zipfile.ZipFile(zip_stream, 'r') as zip_ref:
        file_list = zip_ref.namelist()
        # Display all file names
        all_files_json = json.dumps(file_list, indent=4)
        print("All Files:\n", all_files_json)

        # Filter and display non-Excel files
        non_excel_files = [f for f in file_list if not f.endswith(('.csv', '.xlsx'))]
        non_excel_json = json.dumps(non_excel_files, indent=4)
        print("Non-Excel Files:\n", non_excel_json)

        # Process Excel files
        excel_details = {}
        for file in file_list:
            if file.endswith(('.csv', '.xlsx')):
                with zip_ref.open(file) as f:
                    df = pd.read_csv(f) if file.endswith('.csv') else pd.read_excel(f)
                    # Process each row in the DataFrame
                    excel_details[file] = [row.to_dict() for index, row in df.iterrows()]

        excel_details_json = json.dumps(excel_details, indent=4)
        print("Excel File Details:\n", excel_details_json)

process_button.on_click(process_files)


# In[ ]:





# In[ ]:





# In[ ]:





# import zipfile
# import io
# import json
# import pandas as pd
# import ipywidgets as widgets
# from IPython.display import display
# 
# # Upload button
# upload_button = widgets.FileUpload(
#     accept='.zip', 
#     multiple=False
# )
# display(upload_button)
# 
# # Button to process the uploaded file
# process_button = widgets.Button(description="Process Files")
# display(process_button)
# 
# def process_files(b):
#     # Read the uploaded content
#     uploaded_file = next(iter(upload_button.value.values()))
#     content = uploaded_file['content']
#     zip_stream = io.BytesIO(content)
# 
#     with zipfile.ZipFile(zip_stream, 'r') as zip_ref:
#         file_list = zip_ref.namelist()
#         # Display all file names
#         all_files_json = json.dumps(file_list, indent=4)
#         print("All Files:\n", all_files_json)
# 
#         # Filter and display non-Excel files
#         non_excel_files = [f for f in file_list if not f.endswith(('.csv', '.xlsx'))]
#         non_excel_json = json.dumps(non_excel_files, indent=4)
#         print("Non-Excel Files:\n", non_excel_json)
# 
#         # Process Excel files
#         excel_details = {}
#         for file in file_list:
#             if file.endswith(('.csv', '.xlsx')):
#                 with zip_ref.open(file) as f:
#                     df = pd.read_csv(f) if file.endswith('.csv') else pd.read_excel(f)
#                     # Process each row in the DataFrame
#                     excel_details[file] = [row.to_dict() for index, row in df.iterrows()]
# 
#         excel_details_json = json.dumps(excel_details, indent=4)
#         print("Excel File Details:\n", excel_details_json)
# 
# process_button.on_click(process_files)
# 

# In[ ]:




