from flask import jsonify
import html.entities

"""
Returns JSON with the error message it receives as a parameter
"""
def error_message(message='Incorrect parameters'):
    return jsonify({'error': message})

"""
Substitutes a string's non-ASCII characters by their equivalent character entities.
It also replaces spaces by plus signs, as requested by the book cover API.
Proposed and generated by ChatGPT
"""
def convert_to_html_entities(text: str):
    result = []
    for char in text:
        # Check if the character is ASCII
        if ord(char) < 128:
            result.append(char)
        else:
            # Attempt to find a named HTML entity for the character
            entity_name = html.entities.codepoint2name.get(ord(char))
            if entity_name:
                # Use the named entity (e.g., &euml; for ë)
                result.append(f"&{entity_name};")
            else:
                # Use a numeric entity if no named entity exists
                result.append(f"&#{ord(char)};")
    return ''.join(result).replace(' ', '+')